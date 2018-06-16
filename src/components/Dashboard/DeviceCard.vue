<template>
  <md-layout
    md-flex="50"
    md-flex-xsmall 
    md-flex-small="50" 
    md-flex-medium="33"
  >
    <div class="device-card">
      <md-card>
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
          <md-button class="md-raised md-dense device-card-action"
            v-on:click="goToDetails">
            More Info
          </md-button>
          <md-button class="md-raised md-dense device-card-action"
            v-on:click="clearErrors">
            Clear Errors
          </md-button>
        </md-card-content>
      </md-card>
    </div>
  </md-layout>
</template>

<script>
import deviceService from '../../services/devices';

export default {
  name: 'device-card',
  props: ['device'],
  methods: {
    clearErrors() {
      deviceService.clearDeviceErrors(this.device.deviceId);
    },
    goToDetails() {
      this.$router.push(`/device/${this.device.deviceId}`);
    },
  },
};
</script>

<style scoped>
.device-card {
  width: 100%;
  height: fit-content;
  padding: 40px;
}

.info-row {
  margin-bottom: 15px;
}

.device-card-action {
  margin-left: 0px;
  background-color: #f8e17f !important;
}
</style>
