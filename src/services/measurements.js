import firebase from 'firebase';

function getRealTimeMeasurements(deviceId, callback) {
  const measureRef = firebase.database().ref(`realTimeMeasurements/${deviceId}`)
    .limitToLast(1000);

  measureRef.on('child_added', (data) => {
    callback({
      timestamp: data.key,
      ...data.val(),
    });
  });
}

function getHistoricMeasurements(deviceId, callback) {
  const measureRef = firebase.database().ref(`averagedMeasurements/${deviceId}`)
    .limitToLast(1000);

  measureRef.on('child_added', (data) => {
    callback({
      timestamp: data.key,
      temperature: data.val(),
    });
  });
}

function getLatestMeasurement(deviceId, callback) {
  const measureRef = firebase.database().ref(`realTimeMeasurements/${deviceId}`)
    .limitToLast(1);

  measureRef.on('child_added', (data) => {
    callback({
      timestamp: data.key,
      ...data.val(),
    });
  });
}

export default {
  getRealTimeMeasurements,
  getHistoricMeasurements,
  getLatestMeasurement,
};
