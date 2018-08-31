/****************************************
      This file handles our auth
      for our app.
*****************************************/

import { ref, firebaseAuth } from 'config/constants'

// Facebook pop up for sign in
export default function auth() {
  return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
}

// export default function auth(authType) {
//   return firebaseAuth().signInWithPopup(authType === 'Facebook'
//     ? new firebaseAuth.FacebookAuthProvider()
//     : new firebaseAuth.GithubAuthProvider());
// }


// Handles unauth of our firebase
export function logout () {
  return firebaseAuth().signOut()
}

// Saves the user to our firebase database
export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}

/****************************************
      Email/Password login
*****************************************/
export function emailAuth(email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password)
}
