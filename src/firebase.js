import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyCeCDQhOL6DGAqy7tpkWbyZI4o7iTeMHrk",
  authDomain: "fb-crud-react-79886.firebaseapp.com",
  projectId: "fb-crud-react-79886",
  storageBucket: "fb-crud-react-79886.appspot.com",
  messagingSenderId: "300930735541",
  appId: "1:300930735541:web:cf6b4ac825107a748b0dfc"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig); 

export const db = fb.firestore()