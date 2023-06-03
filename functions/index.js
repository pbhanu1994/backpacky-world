/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// const functions = require("firebase-functions");

const proxy = require("./proxy.js");

// const runtimeOpts = {
//   timeoutSeconds: 60,
//   memory: "256MB",
//   // Set a lower value for CPU
//   cpu: "0.5",
// };

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = functions
//   .runWith(runtimeOpts)
//   .https.onRequest((request, response) => {
//     response.send("Hello, world!");
//   });

exports.proxy = proxy.default;
