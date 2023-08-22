import {initializeApp} from "firebase/app";


// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVd66VfrF_GrRT6-8-Vxwr83SwQOfR8Zs",
    authDomain: "barriobet-faf43.firebaseapp.com",
    projectId: "barriobet-faf43",
    storageBucket: "barriobet-faf43.appspot.com",
    messagingSenderId: "964878026897",
    appId: "1:964878026897:web:602d922c159289f4cf9730"
  };

export const app = initializeApp(firebaseConfig);


