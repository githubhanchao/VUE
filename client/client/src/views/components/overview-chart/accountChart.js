
import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default ({
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartData'],
  data() {
    return {
      mytension: 0,
    };
  },
  mounted() {
    const options = {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      // gridLines: {
      //   display: true,
      //   borderColor: '#b3ebe0',
      // },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: true,
          },
        }],
        xAxes: [{
          gridLines: {
            display: true,
          },
        }],
      },
    };
    this.renderChart(this.chartData, options);
  },
});
