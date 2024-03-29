import { Controller } from '@hotwired/stimulus';
import createChart from './utils/graph_creator.js';

export default class extends Controller {
  static targets = ['myChart', 'weatherList', 'weatherHeader'];

  connect() {
    const chartContext = this.canvasContext();
    const { weatherListTarget } = this;
    const { weatherHeaderTarget } = this;

    const avgTemps = gon.temps.map((hash) => hash.avg_temp_c);
    const labels = gon.temps.map((hash) => hash.date);
    const todayTemp = gon.temps[0];

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
    header.id = 'cardsList';
    header.classList.add('flex', 'justify-between', 'space-x-4', 'dark:text-gray-400');
    header.innerHTML = `<div class="w-full max-w-screen-ring-white">
                            <div class="flex justify-between">
                              <div class="flex flex-col">
                                <span class="text-6xl font-bold">${temp.avg_temp_c}°C</span>
                                <span class="font-semibold mt-1 text-gray-500">${gon.location.name}/${gon.location.country}</span>
                              </div>
                              <div class="flex flex-col">
                                <img src='${temp.condition.icon}'></img>
                              </div>
                            </div>
                          </div>`;

    target.appendChild(header);
  }

  renderChart(context, labels, temps) {
    const data = {
      labels,
      datasets: [{
        label: 'average temps',
        data: temps,
        borderColor: '#f67019',
        fill: false,
        stepped: false,
        tension: 0.5,
      }],
    };

    const options = {
      responsive: true,
      interaction: {
        intersect: false,
        axis: 'x',
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    };

    createChart(context, data, options);
  }

  renderWeatherList(target) {
    if (!target) return;

    const cardsList = document.createElement('div');
    cardsList.classList.add('flex', 'justify-between', 'space-x-4', 'dark:text-gray-400');
    cardsList.id = 'cardsList';

    gon.temps.forEach((element) => {
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
