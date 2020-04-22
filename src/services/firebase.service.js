import Credentials from './../params.inc';

const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');
require('firebase/storage');
require('firebase/functions');

const FirebaseService = {
    connection: null,
    db: null,

    initialize: () => {
        if(!FirebaseService.connection) {
            FirebaseService.connection = firebase.initializeApp(Credentials.firebase);
        }
        if(!FirebaseService.db) {
            FirebaseService.db = firebase.firestore();
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
    getDb: () => FirebaseService.db,

    readAllDataFromCollection: collectionName => FirebaseService.getDb().collection(collectionName).get()
};

export default FirebaseService;