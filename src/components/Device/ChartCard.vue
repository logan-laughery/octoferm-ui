<template>
  <md-card class="chart">
      <md-layout>
        <md-select v-model="chartType" class="chart-dropdown">
          <md-option value="realTime">Real Time Measurements</md-option>
          <md-option value="average">Averaged Measurements</md-option>
        </md-select>
      </md-layout>
      <real-time-chart :deviceId="deviceId" v-if="chartType === 'realTime'"/>
      <averaged-chart :deviceId="deviceId" v-else/>
  </md-card>
</template>

<script>
import RealTimeChart from '@/components/Device/RealTimeChart';
import AveragedChart from '@/components/Device/AveragedChart';

export default {
  name: 'chart-card',
  props: ['deviceId'],
  components: {
    RealTimeChart,
    AveragedChart,
  },
  data: () => ({
    chartType: 'realTime',
  }),
};
</script>

<style>
.chart {
  padding-right: 20px;
  display: initial;
  width: 100%;
  height: fit-content;
}

.chart-dropdown {
  width: 232px;
  margin-top: 10px;
  margin-bottom: -30px;
  margin-left: 10px;
}
</style>
