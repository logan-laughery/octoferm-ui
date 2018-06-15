<template>
  <md-layout id="dashboard"
    md-gutter
  >
    <device-card v-for="device in devices"
      :key="device.deviceId"
      :device="device"/>
  </md-layout>
</template>

<script>
import DeviceCard from '@/components/Dashboard/DeviceCard';
import deviceService from '../../services/devices';

export default {
  name: 'dashboard',
  data: () => ({
    devices: [],
  }),
  components: {
    DeviceCard,
  },
  mounted() {
    deviceService.getAllDevices()
      .then((devices) => {
        this.devices = devices;
      });
  },
};
</script>

<style>
</style>
