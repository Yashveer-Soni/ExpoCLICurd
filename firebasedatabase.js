import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDE0c9V5oK-z47kAIRNJHWWZWBaghNMc-I",
    authDomain: "crud-1f6d2.firebaseapp.com",
    databaseURL: "https://crud-1f6d2-default-rtdb.firebaseio.com",
    projectId: "crud-1f6d2",
    storageBucket: "crud-1f6d2.appspot.com",
    messagingSenderId: "949494067039",
    appId: "1:949494067039:web:bf8f4c19ef9e42681bd0ea",
    measurementId: "G-RTPN6EJJJG"
  };
  
  const app = initializeApp(firebaseConfig);

  export default app;