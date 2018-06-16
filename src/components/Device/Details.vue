<template>
  <md-layout
    md-flex
    md-gutter
  >
    <div class="details">
      <real-time-chart :deviceId="deviceId"/>
      <!-- <device-card :deviceId="deviceId"/> -->
      <!-- <averaged-chart :deviceId="deviceId"/> -->
    </div>
  </md-layout>
</template>

<script>
import RealTimeChart from '@/components/Device/RealTimeChart';
import AveragedChart from '@/components/Device/AveragedChart';
import DeviceCard from '@/components/Device/DeviceCard';

export default {
  name: 'details',
  components: {
    RealTimeChart,
    AveragedChart,
    DeviceCard,
  },
  props: ['deviceId'],
};
</script>

<style>
.details {
    width: 100%;
    padding: 40px;
    overflow: hidden;
    overflow-y: auto;
}
</style>
