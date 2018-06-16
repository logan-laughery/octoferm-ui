<template>
  <md-layout
    md-flex="50"
    md-flex-small="50" 
    md-flex-medium="33"
    v-if="!!device"
  >
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
            v-on:click="edit">
            Edit
          </md-button>
        </md-card-content>
      </md-card>
  </md-layout>
</template>

<script>
import deviceService from '../../services/devices';

export default {
  name: 'device-card',
  data: () => ({
    device: null,
  }),
  props: ['deviceId'],
  methods: {
    edit() {
      this.$router.push(`/device/${this.deviceId}`);
    },
  },
  mounted() {
    deviceService.getDevice(this.deviceId)
      .then((device) => {
        this.device = device;
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
</style>
