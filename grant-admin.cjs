// ONE-TIME local admin bootstrap. Never upload a service-account JSON to GitHub.
// GOOGLE_APPLICATION_CREDENTIALS must point to a local service-account JSON.
// Usage: node scripts/grant-admin.cjs <FIREBASE_AUTH_UID>
const admin=require('firebase-admin');admin.initializeApp({credential:admin.credential.applicationDefault(),projectId:'exam-test-84bd9'});
const uid=process.argv[2];if(!uid)throw Error('Pass UID from Authentication > Users');
admin.auth().setCustomUserClaims(uid,{admin:true}).then(()=>console.log('Granted admin role. Log out and back in.')).catch(e=>{console.error(e);process.exit(1)});
