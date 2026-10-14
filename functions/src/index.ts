import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Firebase Admin
admin.initializeApp();

/**
 * Gemini API Question Generator Function
 * This function is protected and can only be called by authenticated Admins.
 */
export const generateAiQuestions = functions
  .region("asia-south1")
  .runWith({ 
    secrets: ["GEMINI_API_KEY"], // Secret stored in Google Cloud Secret Manager
    timeoutSeconds: 60 
  })
  .https.onCall(async (data, context) => {
    
    // Security Check: Verify if the user is an Admin
    if (!context.auth || !context.auth.token.admin) {
      throw new functions.https.HttpsError(
        "permission-denied", 
        "Only authorized administrators can generate questions."
      );
    }

    const { subject, chapter, difficulty, questionCount, language } = data;
    
    // Retrieve the secret API key from Firebase environment
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new functions.https.HttpsError(
        "internal", 
        "Gemini API key is not configured on the server."
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash for fast and accurate JSON generation
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `
      You are an expert educational examiner. Create exactly ${questionCount} multiple-choice questions for ${subject}, specifically from the topic: ${chapter}.
      The difficulty level should be ${difficulty}.
      Language of the questions and explanations must be: ${language}.
      
      Generate the questions and automatically determine the correct answer. Provide a short explanation for each correct answer.
      
      Return ONLY a JSON array of objects following this exact structure:
      [
        {
          "question": "Question text here?",
          "options": {
            "A": "Option 1",
            "B": "Option 2",
            "C": "Option 3",
            "D": "Option 4"
          },
          "correctOption": "A",
          "explanation": "Brief explanation of the answer",
          "difficulty": "${difficulty}"
        }
      ]
    `;

    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      // Parse the JSON string returned by Gemini into a JavaScript object
      const parsedQuestions = JSON.parse(responseText);
      
      return { success: true, questions: parsedQuestions };
      
    } catch (error) {
      console.error("AI Generation Failed:", error);
      throw new functions.https.HttpsError(
        "internal", 
        "Failed to generate questions using AI. Please try again."
      );
    }
  });

/**
 * Trigger to assign standard student role upon user creation
 */
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  // Automatically assign basic custom claims if needed, though admin must be set manually
  console.log(`New user created: ${user.uid}`);
});
