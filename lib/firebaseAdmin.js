import * as firebaseAdmin from 'firebase-admin';

// get this JSON from the Firebase board
// you can also store the values in environment variables
// import serviceAccount from './secret.json';

const credential = JSON.parse(
    Buffer.from(process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        // credential: firebaseAdmin.credential.cert({
        //   privateKey: serviceAccount.private_key,
        //   clientEmail: serviceAccount.client_email,
        //   projectId: serviceAccount.project_id,
        // }),
        credential: firebaseAdmin.credential.cert(credential),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
}

var bucket = firebaseAdmin.storage().bucket();

export { firebaseAdmin };

export { bucket };

//https://dev.to/parondeau/gcp-credentials-next-js-3a0d
//https://colinhacks.com/essays/nextjs-firebase-authentication
//https://github.com/colinhacks/next-firebase-ssr

//https://dev.to/theranbrig/server-side-authentication-with-nextjs-and-firebase-354m