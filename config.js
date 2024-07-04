import * as firebase from 'firebase/app'
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAE_LcfLbfpPP7UZKUlCx2kdDP2HehDa1U",
    authDomain: "sualai.firebaseapp.com",
    projectId: "sualai",
    storageBucket: "sualai.appspot.com",
    messagingSenderId: "417512540101",
    appId: "1:417512540101:web:1ef71945429eff87caedac",
    measurementId: "G-9YFSDLZYR8"
}

const app = firebase.initializeApp(firebaseConfig)
export default app;