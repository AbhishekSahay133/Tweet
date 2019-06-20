// import firebase from 'firebase'
// import 'firebase/firestore'
// import 'firebase/storage'
// import 'firebase/auth'
// const firebaseConfig = {
//     apiKey: 'AIzaSyBdUPCZJLChweLyFve2fTc6XI_a_aKqBY8',
//     authDomain: 'newblog-59d7c.firebaseapp.com',
//     databaseURL: 'https://newblog-59d7c.firebaseio.com',
//     projectId: 'newblog-59d7c',
//     storageBucket: 'newblog-59d7c.appspot.com',
//     messagingSenderId: '533115851630',
//     appId: '1:533115851630:web:4cc3932b69ca875c'
//   }
//   // Initialize Firebase
//   const fb = firebase.initializeApp(firebaseConfig);
//  const firebaseapp = fb;

//  export default firebaseapp.firestore();

import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const config = {
        apiKey: 'AIzaSyBdUPCZJLChweLyFve2fTc6XI_a_aKqBY8',
        authDomain: 'newblog-59d7c.firebaseapp.com',
        databaseURL: 'https://newblog-59d7c.firebaseio.com',
        projectId: 'newblog-59d7c',
        storageBucket: 'newblog-59d7c.appspot.com',
        messagingSenderId: '533115851630',
        appId: '1:533115851630:web:4cc3932b69ca875c'
      };
      const fb = firebase.initializeApp(config);
      const db = firebase.firestore();

      export {fb, db}
