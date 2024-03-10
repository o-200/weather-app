import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function createChart(context, data, options) {
  new Chart(context, {
    type: 'line',
    data,
    options,
  });
}
