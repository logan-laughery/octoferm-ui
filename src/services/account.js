import firebase from 'firebase';

function register(email, password) {
  return firebase.auth()
    .createUserWithEmailAndPassword(email, password);
}

function login(email, password) {
  return firebase.auth()
    .signInWithEmailAndPassword(email, password);
}

function getCurrentUser() {
  return firebase.auth().currentUser;
}

export default {
  login,
  register,
  getCurrentUser,
};
