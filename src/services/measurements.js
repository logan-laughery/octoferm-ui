import firebase from 'firebase';

function getMeasurements(deviceId, callback) {
  const measureRef = firebase.database().ref(`realTimeMeasurements/${deviceId}`)
    .limitToLast(1000);

  measureRef.on('child_added', (data) => {
    callback({
      timestamp: data.key,
      ...data.val(),
    });
  });
}

export default {
  getMeasurements,
};
