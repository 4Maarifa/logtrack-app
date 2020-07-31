
const FirebaseService = {

  connection: null,
  firestore: null,
  rtDb: null,

  intiialize: () => { /* Nothing */ },

  getFirebaseObject: () => null,

  signIn: (email, password) => { /* Nothing */ },

  signUp: (email, password) => { /* Nothing */ },

  updateUser: userProps => { /* Nothing */ },

  signOut: () => {/* Nothing */},

  getCurrentUser: () => ({
    uid: '---------------',
    email: 'test@user.com'
  }),

  isUserConnected: () => true,
  
  getFirestore: () => null,

  getRtDb: () => null
};

export default FirebaseService;
