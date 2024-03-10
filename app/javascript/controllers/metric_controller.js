import { Controller } from "@hotwired/stimulus"
import createChart from './utils/graph_creator.js'

export default class extends Controller {
    static targets = ['myChart'];

    canvasContext() {
        return this.myChartTarget.getContext('2d');
    }

    connect() {
        const data = {
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
            }

        const options = {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }

        createChart(this.canvasContext(), data, options)
    }
}