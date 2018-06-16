<template>
  <md-layout
    class="details"
  >
      <md-layout md-flex="100" class="details-chart">
        <chart-card :deviceId="deviceId"/>
      </md-layout>
      <md-layout class="details-device">
        <md-layout md-flex="50" class="details-device-card">
          <device-card :deviceId="deviceId"/>
        </md-layout>
        <md-layout md-flex="50" class="details-error-card">
          <error-card :deviceId="deviceId"/>
        </md-layout>
      </md-layout>
  </md-layout>
</template>

<script>
import ChartCard from '@/components/Device/ChartCard';
import AveragedChart from '@/components/Device/AveragedChart';
import DeviceCard from '@/components/Device/DeviceCard';
import ErrorCard from '@/components/Device/ErrorCard';

export default {
  name: 'details',
  components: {
    ChartCard,
    AveragedChart,
    DeviceCard,
    ErrorCard,
  },
  props: ['deviceId'],
};
</script>

<style>
.details {
    align-content:flex-start;
}

.details-chart {
  padding: 30px;
}

.details-device {
  padding: 30px;
  padding-top: 0px;
}

.details-device-card {
  padding-right: 15px;
}

.details-error-card {
  padding-left: 15px;
}
</style>
