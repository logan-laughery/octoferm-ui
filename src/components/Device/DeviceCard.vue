<template>
  <md-card v-if="!!device" class="device-card">
    <md-card-content>
      <div class="md-title">Device #{{device.deviceId}}</div>
      <div class="md-subheading">{{device.name}} - {{device.address}}</div>
      <hr/>
      <md-layout class="info-row">
        <md-layout md-flex="50" md-column>
          <div class="md-subheading">Current</div>
          <div class="md-display-2">{{device.lastTemperature}} °F</div>          
        </md-layout>
        <md-layout md-flex="50" md-column>
          <div class="md-subheading">Desired</div>    
          <div class="md-display-2">{{device.temperature}} °F</div>          
        </md-layout>
      </md-layout>
      <md-layout class="info-row">
        <md-layout md-flex="50" md-column>
          <div class="md-subheading">Pump</div>   
          <div class="md-display-1">{{device.lastPump ? 'On' : 'Off'}}</div>
        </md-layout>
        <md-layout md-flex="50" md-column>
          <div class="md-subheading">Error Count</div>   
          <div class="md-display-1">{{device.errorCount}}</div>
        </md-layout>
      </md-layout>         
      <md-layout md-column class="info-row">
        <div class="md-subheading">Last Update</div>   
        <div class="md-display-1">{{device.lastUpdate}}</div>
      </md-layout>
      <div v-if="editing">
        <hr/>
        <md-layout md-gutter="8">
          <md-layout md-flex="50" md-column>
            <md-input-container class="condensed">
              <label>Desired Temperature</label>
              <md-input v-model="desiredTemp"/>
            </md-input-container>
          </md-layout>
          <md-layout md-flex="50" md-column>
            <md-input-container class="condensed">
              <label>Pump State</label>
              <md-select v-model="pumpState">
                <md-option value="auto">auto</md-option>
                <md-option value="on">on</md-option>
                <md-option value="off">off</md-option>
              </md-select>
            </md-input-container>
          </md-layout>
        </md-layout>
        <md-button class="md-raised md-dense device-card-action"
          v-on:click="cancel">
          Cancel
        </md-button>
        <md-button class="md-raised md-dense device-card-action"
          v-on:click="save">
          Save
        </md-button>
      </div>
      <md-button class="md-raised md-dense device-card-action"
        v-on:click="edit" v-else>
        Edit
      </md-button>
    </md-card-content>
  </md-card>
</template>

<script>
import deviceService from '../../services/devices';
import measurementService from '../../services/measurements';

export default {
  name: 'device-card',
  data: () => ({
    device: null,
    editing: false,
    desiredTemp: null,
    pumpState: null,
  }),
  props: ['deviceId'],
  methods: {
    edit() {
      this.editing = true;
    },
    cancel() {
      this.editing = false;
    },
    save() {
      deviceService.updateDevice(this.device.deviceId, this.desiredTemp, this.pumpState)
        .then(() => {
          this.editing = false;
        });
    },
    getMeasurements(measurement) {
      this.device.lastUpdate = new Date(measurement.timestamp * 1000).toLocaleString();
      this.device.lastTemperature = measurement.t;
      this.device.lastPump = measurement.p;
    },
  },
  mounted() {
    measurementService.getLatestMeasurement(this.deviceId, this.getMeasurements);
    deviceService.getDevice(this.deviceId)
      .then((device) => {
        this.device = device;
        this.desiredTemp = device.temperature;
        this.pumpState = device.pumpState;
      });
  },
};
</script>

<style>

.info-row {
  margin-bottom: 15px;
}

.device-card-action {
  margin-left: 0px;
  background-color: #f8e17f !important;
}

.device-card {
  width: 100%;
  height: fit-content;
}
</style>
