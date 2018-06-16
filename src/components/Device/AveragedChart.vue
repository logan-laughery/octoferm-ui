<template>
  <md-card class="chart">
    <ve-line 
      :extend="chartExtend" 
      :data="smoothedData" 
      :settings="chartSettings"
    >
    </ve-line>
  </md-card>
</template>

<script>
import measurementService from '../../services/measurements';

export default {
  name: 'averaged-chart',
  props: ['deviceId'],
  data: () => ({
    measurements: {
      columns: ['timestamp', 'temperature'],
      rows: [],
    },
    errors: [],
  }),
  computed: {
    smoothedData() {
      return {
        columns: this.measurements.columns,
        rows: this.measurements.rows,
      };
    },
    chartExtend() {
      return {
        xAxis: {
          axisLabel: {
            rotate: 0,
          },
        },
        yAxis: {
          boundaryGap: true,
        },
        grid: {
          right: 20,
        },
      };
    },
    chartSettings() {
      return {
        xAxisType: 'time',
        scale: [true, false],
        labelMap: {
          temperature: 'Temperature',
        },
        metrics: ['temperature'],
        dimension: ['timestamp'],
      };
    },
  },
  mounted() {
    measurementService.getHistoricMeasurements(this.deviceId, this.addMeasurement);
  },
  methods: {
    addMeasurement({ timestamp, temperature }) {
      this.measurements.rows.push({
        timestamp: timestamp * 1000,
        temperature: Number(temperature),
      });
    },
  },
};
</script>

<style>
.chart {
    padding-right: 20px;
}
</style>
