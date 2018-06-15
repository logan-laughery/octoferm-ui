<template>
  <md-layout
    md-flex
    md-gutter
  >
    <div class="details">
      <md-card class="chart">
        <ve-line :extend="chartExtend" :data="smoothedData" :settings="chartSettings"></ve-line>
      </md-card>
    </div>
  </md-layout>
</template>

<script>
import measurementService from '../../services/measurements';

// function movingAverage() {
//     var N = 100;
// var someData = [];
// for (var i = 0; i < N; i++)
// {
//     someData.push([i,Math.random() * 100]);
// }

// var moveMean = [];
// for (var i = 1; i < N-1; i++)
// {
//     var mean = (someData[i][1] + someData[i-1][1] + someData[i+1][1])/3.0;
//     moveMean.push([i,mean]);
// }
// }

function getAverage(measurements, i, size) {
  const boundary = (size - 1) / 2;
  const validValues = Array.from(Array(boundary)).reduce((acc, item, j) => {
    if (!acc) {
      return acc;
    }

    if (measurements[i - (j + 1)] && measurements[i + (j + 1)]) {
      return true;
    }

    return false;
  }, true);

  if (!validValues) {
    return undefined;
  }

  let sum = measurements[i].temperature;

  Array.from(Array(boundary)).map((item, j) => {
    sum += measurements[i - (j + 1)].temperature;
    sum += measurements[i + (j + 1)].temperature;

    return sum;
  });

  const average = sum / size;

  return {
    ...measurements[i],
    temperature: average,
  };
}

function movingAverage(measurements) {
  return measurements.map((m, i) => {
    const mean = getAverage(measurements, i, 9);

    if (!mean) {
      return m;
    }

    return mean;
  });
}

function reduceFilter(measurements, size) {
  return measurements.reduce((acc, cur, i) => {
    // 0 1 2 3 4 5 6 7 8
    //   ^     ^     ^
    if ((i + 1) % size === 0) {
      return [...acc, getAverage(measurements, i - 1, size)];
    }

    return acc;
  }, []);
}

export default {
  name: 'device-card',
  props: ['deviceId'],
  data: () => ({
    // chartSettings: {
    //   xAxisType: 'time',
    //   scale: [true, false],
    //   labelMap: {
    //     temperature: 'Temperature',
    //   },
    //   metrics: ['temperature'],
    //   dimension: ['timestamp'],
    //   itemStyle: {
    //     color: (item, test) => {
    //       // if (this.smoothedData[item.dataIndex].pump) {
    //       //   return 'blue';
    //       // }
    //       // console.log(this.a.computed.smoothedData()); // es-lint-ignore-line no-console
    //       console.log(item); // es-lint-ignore-line no-console
    //       console.log(test); // es-lint-ignore-line no-console

    //       return 'red';
    //     },
    //   },
    //   // lineStyle: {
    //   //   color: {
    //   //     type: 'linear',
    //   //     x: 0,
    //   //     y: 0,
    //   //     x2: 0,
    //   //     y2: 1,
    //   //     colorStops: [{
    //   //       offset: 0, color: 'red', // color at 0% position
    //   //     }, {
    //   //       offset: 1, color: 'blue', // color at 100% position
    //   //     }],
    //   //     globalCoord: false, // false by default
    //   //   },
    //   // },
    // },
    measurements: {
      columns: ['timestamp', 'temperature', 'pump'],
      rows: [],
    },
    errors: [],
  }),
  computed: {
    smoothedData() {
      return {
        columns: this.measurements.columns,
        rows: reduceFilter(movingAverage(this.measurements.rows), 3),
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
        // series: (v) => {
        //   console.log('v', v); // es-lint-ignore-line no-console

        //   v[0].data.map((item, index) => {
        //     Object.assign(item, {
        //       extra: self.smoothedData.rows[index],
        //     });

        //     return item;
        //   });
        //   return v;
        // },
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
            // console.log(this.a.computed.smoothedData()); // es-lint-ignore-line no-console
            // console.log(item); // es-lint-ignore-line no-console
            // console.log(test); // es-lint-ignore-line no-console

            return '#68d5af';
          },
        },
        lineStyle: {
          color: '#68d5af',
        },
        // lineStyle: {
        //   color: {
        //     type: 'linear',
        //     x: 0,
        //     y: 0,
        //     x2: 0,
        //     y2: 1,
        //     colorStops: [{
        //       offset: 0, color: 'red', // color at 0% position
        //     }, {
        //       offset: 1, color: 'blue', // color at 100% position
        //     }],
        //     globalCoord: false, // false by default
        //   },
        // },
      };
    },
  },
  mounted() {
    console.log('Device:', this.deviceId); // eslint-disable-line no-console
    measurementService.getMeasurements(this.deviceId, this.addMeasurement);
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
.details {
    width: 100%;
    margin: 40px;
}
.chart {
    padding-right: 20px;
}
</style>
