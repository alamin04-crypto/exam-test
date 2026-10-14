import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";

admin.initializeApp();
const db = admin.firestore();

// ১. AI Question Generator (আগের তৈরি করা)
export const generateAiQuestions = functions
  .region("asia-south1")
  .runWith({ secrets: ["GEMINI_API_KEY"], timeoutSeconds: 60 })
  .https.onCall(async (data, context) => {
    if (!context.auth || !context.auth.token.admin) {
      throw new functions.https.HttpsError("permission-denied", "Only admins can use AI.");
    }

    const { subject, chapter, difficulty, questionCount, language } = data;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) throw new functions.https.HttpsError("internal", "API Key missing.");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Create exactly ${questionCount} multiple-choice questions for ${subject}, topic: ${chapter}. Difficulty: ${difficulty}. Language: ${language}. Return ONLY a JSON array with: question, options (A,B,C,D), correctOption, explanation, difficulty.`;

    try {
      const result = await model.generateContent(prompt);
      const parsedQuestions = JSON.parse(result.response.text());
      return { success: true, questions: parsedQuestions };
    } catch (error) {
      throw new functions.https.HttpsError("internal", "AI Generation Failed.");
    }
  });

// ২. Secure Exam Submission & Auto Grading
export const submitExam = functions
  .region("asia-south1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError("unauthenticated", "User must be logged in.");
    }

    const { examId, studentAnswers, securityViolations } = data;
    const uid = context.auth.uid;

    // Fetch the private answer key (hidden from students)
    const examPrivateRef = db.collection("examPrivate").doc(examId);
    const examPrivateSnap = await examPrivateRef.get();

    if (!examPrivateSnap.exists) {
      throw new functions.https.HttpsError("not-found", "Answer key not found.");
    }

    const examData = examPrivateSnap.data();
    const correctAnswers = examData?.answers || {};
    const marksPerQuestion = examData?.marksPerQuestion || 1;
    const negativeMarking = examData?.negativeMarking || 0;

    let obtainedMarks = 0;
    let correctCount = 0;
    let wrongCount = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    const totalMarks = totalQuestions * marksPerQuestion;

    // Calculate score
    for (const [qId, correctOption] of Object.entries(correctAnswers)) {
      const studentAns = studentAnswers[qId];
      if (studentAns) {
        if (studentAns === correctOption) {
          obtainedMarks += marksPerQuestion;
          correctCount++;
        } else {
          obtainedMarks -= negativeMarking;
          wrongCount++;
        }
      }
    }

    const percentage = (obtainedMarks / totalMarks) * 100;

    // Create the result record (Strictly HIDDEN by default)
    const resultRecord = {
      studentId: uid,
      examId: examId,
      totalQuestions,
      correctCount,
      wrongCount,
      obtainedMarks,
      totalMarks,
      percentage: Math.max(0, percentage), // Prevent negative total
      securityViolations: securityViolations || 0,
      isPublished: false, // RULE: Must be false until Admin publishes
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("results").add(resultRecord);

    return { success: true, message: "Exam submitted successfully. Results will be available once published by the Admin." };
  });

// ৩. Admin Result Publish / Unpublish Toggle
export const toggleResultPublish = functions
  .region("asia-south1")
  .https.onCall(async (data, context) => {
    if (!context.auth || !context.auth.token.admin) {
      throw new functions.https.HttpsError("permission-denied", "Only admins can publish results.");
    }

    const { examId, publishStatus } = data;
    
    // Update all results for this exam
    const resultsRef = db.collection("results").where("examId", "==", examId);
    const snapshot = await resultsRef.get();

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, { isPublished: publishStatus });
    });

    await batch.commit();
    return { success: true, message: `Results ${publishStatus ? 'published' : 'unpublished'} successfully.` };
  });
