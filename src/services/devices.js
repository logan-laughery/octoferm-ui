import firebase from 'firebase';

function getLastMeasurement(device) {
  const measureRef = firebase.database().ref(`realTimeMeasurements/${device.deviceId}`)
    .limitToLast(1);

  return measureRef.once('value').then((snapshot) => {
    let lastMeasurement = {};

    snapshot.forEach((childSnapShot) => {
      lastMeasurement = Object.assign({}, device, {
        lastUpdate: new Date(childSnapShot.key * 1000).toLocaleString(),
        lastTemperature: childSnapShot.val().t,
        lastPump: childSnapShot.val().p,
      });
    });

    return lastMeasurement;
  });
}

function getAllDevices() {
  const deviceRef = firebase.database().ref('devices/');

  return deviceRef.once('value').then((snapshot) => {
    const devices = [];

    snapshot.forEach((childSnapShot) => {
      devices.push({
        deviceId: childSnapShot.key,
        ...childSnapShot.val(),
      });
    });

    return Promise.all(devices.map(getLastMeasurement));
  });
}

function clearDeviceErrors(deviceId) {
  const updates = {};
  updates[`/errorLogs/${deviceId}`] = null;
  updates[`/devices/${deviceId}/errorCount`] = 0;

  return firebase.database().ref().update(updates);
}

export default {
  getAllDevices,
  clearDeviceErrors,
};
