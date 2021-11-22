// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNm3U_lUO3xXyDIlR5NNujIAfU_V2mD0M",
  authDomain: "langara-edu.firebaseapp.com",
  projectId: "langara-edu",
  storageBucket: "langara-edu.appspot.com",
  messagingSenderId: "929531140943",
  appId: "1:929531140943:web:bab7bcdf8197a5e56d433a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// update firestore settings
db.settings({ timestampsInSnapshots: true });