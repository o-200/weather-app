import { Controller } from "@hotwired/stimulus"
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default class extends Controller {
    static targets = ['myChart'];

    canvasContext() {
        return this.myChartTarget.getContext('2d');
    }

    connect() {
        new Chart(this.canvasContext(), {
            type: 'line',
            data: {
                labels: Object.keys(gon.avg_temps_by_month),
                datasets: [{
                    label: '# temperature in Celsium',
                    data: Object.values(gon.avg_temps_by_month),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }
}