class ChartManager {
    constructor() {
        this.charts = {
            cpu: this.createChart('cpuChart', ['Utilisé', 'Libre']),
            memory: this.createChart('memoryChart', ['Utilisé', 'Libre']),
            disk: this.createChart('diskChart', ['Utilisé', 'Libre'])
        };
    }

    getChartColors(theme = document.documentElement.getAttribute('data-theme')) {
        return {
            light: {
                used: ['#4361ee', '#3a0ca3', '#4cc9f0'],
                free: '#e0e0e0',
                text: '#333333'
            },
            dark: {
                used: ['#6ea8fe', '#9d8cff', '#63e6ff'],
                free: '#4a4a4a',
                text: '#e1e3e5'
            }
        }[theme];
    }

    createChart(canvasId, labels) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        const colors = this.getChartColors();
        const chartIndex = Object.keys(this.charts || {}).length;

        return new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: [],
                    backgroundColor: [colors.used[chartIndex], colors.free]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: colors.text,
                            padding: 20,
                            font: {
                                size: 14,
                                family: "'Poppins', sans-serif"
                            }
                        }
                    }
                }
            }
        });
    }

    updateChartTheme(theme) {
        const colors = this.getChartColors(theme);
        Object.entries(this.charts).forEach(([key, chart], index) => {
            chart.data.datasets[0].backgroundColor = [colors.used[index], colors.free];
            chart.options.plugins.legend.labels.color = colors.text;
            chart.update();
        });
    }

    updateData(chartName, usedValue, totalValue) {
        const chart = this.charts[chartName];
        if (chart) {
            chart.data.datasets[0].data = [usedValue, totalValue - usedValue];
            chart.update();
        }
    }
}