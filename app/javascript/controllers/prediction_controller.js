import { Controller } from "@hotwired/stimulus"
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default class extends Controller {
    static targets = ['myChart'];

    canvasContext() {
        return this.myChartTarget.getContext('2d');
    }

    connect() {
        const min_temps = gon.temps_by_day.map((hash) => hash['min_temp_c'])
        const avg_temps = gon.temps_by_day.map((hash) => hash['avg_temp_c'])
        const max_temps = gon.temps_by_day.map((hash) => hash['max_temp_c'])
        
        const data = {
            labels: gon.temps_by_day.map((hash) => hash['date']),
            datasets: [
                {
                label: 'minimum temps',
                data: min_temps,
                borderColor: '#4dc9f6',
                fill: false,
                stepped: false,
                tension: 0.4,
                },
                {
                label: 'average temps',
                data: avg_temps,
                borderColor: '#f67019',
                fill: false,
                stepped: false,
                tension: 0.4,
                },
                                {
                label: 'maximal temp',
                data: max_temps,
                borderColor: '#f53794',
                fill: false,
                stepped: false,
                tension: 0.4,
                }
            ]
        };

        new Chart(this.canvasContext(), {
          type: 'line',
          data: data,
          options: {
              responsive: true,
              interaction: {
              intersect: false,
              axis: 'x'
              },
              plugins: {
              title: {
                  display: true,
                  text: '7-day weather prediction',
              }
              }
          }
          });
    }
}