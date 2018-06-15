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
import filtersService from '../../services/filters';


export default {
  name: 'real-time-chart',
  props: ['deviceId'],
  data: () => ({
    measurements: {
      columns: ['timestamp', 'temperature', 'pump'],
      rows: [],
    },
    errors: [],
  }),
  computed: {
    smoothedData() {
			const avgMeasurements = filtersService
				.movingAverageFilter(this.measurements.rows, 9);

      return {
        columns: this.measurements.columns,
        rows: filtersService.reduceFilter(avgMeasurements, 3),
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
      const self = this;

      return {
        xAxisType: 'time',
        scale: [true, false],
        labelMap: {
          temperature: 'Temperature',
        },
        metrics: ['temperature'],
        dimension: ['timestamp'],
        itemStyle: {
          color: (item) => {
            if (self.smoothedData &&
              self.smoothedData.rows[item.dataIndex] &&
              self.smoothedData.rows[item.dataIndex].pump) {
              return 'blue';
            }

            return '#68d5af';
          },
        },
        lineStyle: {
          color: '#68d5af',
        },
      };
    },
  },
  mounted() {
    console.log('Device:', this.deviceId); // eslint-disable-line no-console
    measurementService.getRealTimeMeasurements(this.deviceId, this.addMeasurement);
  },
  methods: {
    addMeasurement({ timestamp, t, p }) {
      this.measurements.rows.push({
        timestamp: timestamp * 1000,
        temperature: Number(t),
        pump: p,
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
