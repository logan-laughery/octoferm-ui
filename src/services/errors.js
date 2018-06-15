import firebase from 'firebase';

function getErrors(deviceId, callback) {
  const errorRef = firebase.database().ref(`errorLogs/${deviceId}`);

  errorRef.on('child_added', (data) => {
    callback({
      timestamp: data.key,
      message: data.val(),
    });
  });
}

export default {
  getErrors,
};
