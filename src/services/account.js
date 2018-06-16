import firebase from 'firebase';

function register(email, password) {
  return firebase.auth()
    .createUserWithEmailAndPassword(email, password);
}

function login(email, password) {
  return firebase.auth()
    .signInWithEmailAndPassword(email, password);
}

function logout() {
  return firebase.auth().signOut();
}

function getCurrentUser() {
  return firebase.auth().currentUser;
}

function onAuthChange(callback) {
  firebase.auth().onAuthStateChanged(callback);
}

export default {
  login,
  register,
  getCurrentUser,
  logout,
  onAuthChange,
};
