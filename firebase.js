import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAL3Pzgzs-e1HZiwfQJAfJMkfi5VgKmsiA",
	authDomain: "rn-app-68cc9.firebaseapp.com",
	databaseURL: "https://rn-app-68cc9-default-rtdb.firebaseio.com",
	projectId: "rn-app-68cc9",
	storageBucket: "rn-app-68cc9.appspot.com",
	messagingSenderId: "1002171058108",
	appId: "1:1002171058108:web:3043b43186f507ded80db9",
	measurementId: "G-WGJCVD5SS7",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
