import { Controller } from "@hotwired/stimulus";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default class extends Controller {
    static targets = ['myChart', 'weatherList', 'weatherHeader'];

    connect() {
        const chartContext = this.canvasContext();
        const weatherListTarget = this.weatherListTarget;
        const weatherHeaderTarget = this.weatherHeaderTarget;

        const avgTemps = gon.temps_by_day.map(hash => hash['avg_temp_c']);
        const labels = gon.temps_by_day.map(hash => hash['date']);
        const todayTemp = gon.temps_by_day[0];

        this.renderWeatherHeader(weatherHeaderTarget, todayTemp);
        this.renderChart(chartContext, labels, avgTemps);
        this.renderWeatherList(weatherListTarget);
    }

    canvasContext() {
        return this.myChartTarget.getContext('2d');
    }

    renderWeatherHeader(target, temp) {
      if (!target) return;

      const header = document.createElement('div');
      header.id = 'cardsList'
      header.classList.add('flex', 'justify-between', 'space-x-4', 'dark:text-gray-400');
      header.innerHTML = `<div class="w-full max-w-screen-ring-white">
                            <div class="flex justify-between">
                              <div class="flex flex-col">
                                <span class="text-6xl font-bold">${temp['avg_temp_c']}°C</span>
                                <span class="font-semibold mt-1 text-gray-500">Moscow, RU</span>
                              </div>
                              <div class="flex flex-col">
                                <img src='${temp['condition']['icon']}'></img>
                              </div>
                            </div>
                          </div>`;

      target.appendChild(header);
    }

    renderChart(context, labels, temps) {
        const data = {
            labels: labels,
            datasets: [{
                label: 'average temps',
                data: temps,
                borderColor: '#f67019',
                fill: false,
                stepped: false,
                tension: 0.4,
            }]
        };

        new Chart(context, {
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
    }

    renderWeatherList(target) {
        if (!target) return;

        const cardsList = document.createElement('div');
        cardsList.classList.add('flex', 'justify-between', 'space-x-4', 'dark:text-gray-400');
        cardsList.id = 'cardsList';

        gon.temps_by_day.forEach(element => {
            const card = document.createElement('div');
            card.classList.add('flex', 'flex-col', 'items-center', 'space-y-1');
            card.innerHTML = `<span class="uppercase">${element.date}</span>
                              <img src=${element.condition.icon} />
                              <span>${element.avg_temp_c}</span>`;

            cardsList.appendChild(card);
        });

        target.appendChild(cardsList);
    }
}
