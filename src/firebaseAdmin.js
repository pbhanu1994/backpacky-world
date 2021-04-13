import admin from 'firebase-admin';
import firebaseAdminConfig from '../config/firebase-adminsdk.json';

export const verifyIdToken = token => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(firebaseAdminConfig)
        })
    }

    return admin.auth().verifyIdToken(token).catch(error => {
        throw error;
    })
}