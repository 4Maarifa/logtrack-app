import Credentials from './../params.inc';

const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/database');
require('firebase/auth');
require('firebase/storage');
require('firebase/functions');

/**
 * Service: FirebaseService
 * Service to interact with Firebase functionalities
 */
const FirebaseService = {

    // singleton variables
    connection: null,
    firestore: null,
    rtDb: null,

    initialize: () => {

        // initialize firebase app
        if(!FirebaseService.connection) {
            FirebaseService.connection = firebase.initializeApp(Credentials.firebase);
        }

        // Initialize Firestore connection
        if(!FirebaseService.firestore) {
            FirebaseService.firestore = firebase.firestore();
        }

        // Initialize RT database connection
        if(!FirebaseService.rtDb) {
            FirebaseService.rtDb = firebase.database();
        }
    },

    // Get the global firebase object
    getFirebaseObject: () => FirebaseService.initialize() || firebase,

    // AUTH

    // User signin
    signIn: (email, password) => FirebaseService.getFirebaseObject().auth().signInWithEmailAndPassword(email, password),

    // user signup
    signUp: (email, password) => FirebaseService.getFirebaseObject().auth().createUserWithEmailAndPassword(email, password),

    // update a user
    updateUser: userProps => FirebaseService.getFirebaseObject().auth().currentUser.updateProfile(userProps),

    // user signout
    signOut: () => FirebaseService.getFirebaseObject().auth().signOut(),

    // return the current signin user
    getCurrentUser: () => FirebaseService.getFirebaseObject().auth().currentUser,

    // return true is a user is signedin
    isUserConnected: () => FirebaseService.getCurrentUser() != null,

    // FIRESTORE
    // get the firestore global object to inretact with this database
    getFirestore: () => FirebaseService.firestore,

    // REAL-TIME
    // get the RT global object to interact with this database
    getRtDb: () => FirebaseService.rtDb
};

export default FirebaseService;