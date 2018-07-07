<template>
  <md-layout
    class="details"
  >
    <md-layout
      class="md-gutter-16"
    >
        <md-layout md-flex="100" class="details-chart">
          <chart-card :deviceId="deviceId"/>
        </md-layout>
        <md-layout md-flex="50" md-flex-medium="100" class="details-device-card">
          <device-card :deviceId="deviceId"/>
        </md-layout>
        <md-layout md-flex="50" md-flex-medium="100" class="details-error-card">
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
    margin: 16px;
    width: calc(100vw - 32px);
    align-content:flex-start;
}

.details .md-gutter-16 > .md-layout {
  margin-bottom: 16px;
}
</style>
