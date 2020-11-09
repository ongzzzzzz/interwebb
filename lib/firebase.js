import { firebase } from "@firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/analytics";
import "firebase/storage";

// import { Fuego } from '@nandorojo/swr-firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// add these in .env.local file for no epic errors
const config = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// let fuego;

if(!firebase.apps.length){
	
	firebase.initializeApp(config)
	console.log("Firebase Initialized 🎉")
	
	// fuego = new Fuego(config);

	if(typeof window !== 'undefined'){
		//enable analytics
		firebase.analytics();
		console.log("Firebase Analytics Initialized 📈")

		import("firebase/performance").then(() => {
			firebase.performance();
			console.log("Firebase Performance Initialized 🎩")
		});
	}

	
}

// export default fuego;
export default firebase