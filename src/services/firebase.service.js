import Credentials from './../params.inc';

const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/database');
require('firebase/auth');
require('firebase/storage');
require('firebase/functions');

const FirebaseService = {
    connection: null,
    firestore: null,
    rtDb: null,

    initialize: () => {
        if(!FirebaseService.connection) {
            FirebaseService.connection = firebase.initializeApp(Credentials.firebase);
        }
        if(!FirebaseService.firestore) {
            FirebaseService.firestore = firebase.firestore();
        }
        if(!FirebaseService.rtDb) {
            FirebaseService.rtDb = firebase.database();
        }
    },

    getFirebaseObject: () => FirebaseService.initialize() || firebase,

    // AUTH
    signIn: (email, password) => FirebaseService.getFirebaseObject().auth().signInWithEmailAndPassword(email, password),

    signUp: (email, password) => FirebaseService.getFirebaseObject().auth().createUserWithEmailAndPassword(email, password),

    updateUser: userProps => FirebaseService.getFirebaseObject().auth().currentUser.updateProfile(userProps),

    signOut: () => FirebaseService.getFirebaseObject().auth().signOut(),

    getCurrentUser: () => FirebaseService.getFirebaseObject().auth().currentUser,

    isUserConnected: () => FirebaseService.getCurrentUser() != null,

    // FIRESTORE
    getFirestore: () => FirebaseService.firestore,

    // REAL-TIME
    getRtDb: () => FirebaseService.rtDb
};

export default FirebaseService;