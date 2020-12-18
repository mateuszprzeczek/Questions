import app from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyApn-P-llYIZAUa1Qbkdj2FjtvoTx0Fpis",
    authDomain: "questions-69538.firebaseapp.com",
    databaseURL: "https://questions-69538.firebaseio.com",
    projectId: "questions-69538",
    storageBucket: "gs://questions-69538.appspot.com",
    messagingSenderId: "996067136474",
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
}

export default Firebase;
