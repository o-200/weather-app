import { Controller } from "@hotwired/stimulus"
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default class extends Controller {
    static targets = ['myChart', 'weatherList'];

    canvasContext() {
        return this.myChartTarget.getContext('2d');
    }

    connect() { 
        const avg_temps = gon.temps_by_day.map((hash) => hash['avg_temp_c'])
        
        const data = {
            labels: gon.temps_by_day.map((hash) => hash['date']),
            datasets: [
                {
                    label: 'average temps',
                    data: avg_temps,
                    borderColor: '#f67019',
                    fill: true,
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
                legend: {
                    display: false
                }
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  }
                }
            }
            });

        if (this.weatherListTarget) {
          this.weatherListTarget.innerHTML += `<div class="flex justify-between space-x-4 dark:text-gray-400" id="cardsList"></div>`;

          const cardsList = document.getElementById('cardsList');

          if (cardsList) {
            gon.temps_by_day.forEach(element => {
              cardsList.innerHTML += `<div class="flex flex-col items-center space-y-1">
                                        <span class="uppercase">${element.date}</span>
                                        <img src=${element.condition.icon} />
                                        <span>${element.avg_temp_c}</span>
                                      </div>`;
            });
          }
        }

    }
}