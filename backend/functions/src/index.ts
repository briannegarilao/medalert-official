import * as functions from "firebase-functions";

// Simple HTTP Function
export const helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase Functions!");
});
