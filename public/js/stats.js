class StatsManager {
    constructor() {
        this.stats = {};
        this.init();
    }

    init() {
        this.refreshStats();
        setInterval(() => this.refreshStats(), 5000);
    }

    async refreshStats() {
        try {
            const response = await fetch('/api/stats');
            const data = await response.json();
            this.stats = data;
            this.updateStatsView();
        } catch (error) {
            console.error('Erreur lors de la récupération des statistiques:', error);
        }
    }

    updateStatsView() {
        const statsContent = document.getElementById('detailed-stats');
        if (!statsContent) return;

        statsContent.innerHTML = `
            <div class="stats-section">
                <h2>Système d'exploitation</h2>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Plateforme:</span>
                        <span class="stat-value">${this.stats.os.platform}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Distribution:</span>
                        <span class="stat-value">${this.stats.os.distro}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Version:</span>
                        <span class="stat-value">${this.stats.os.release}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Architecture:</span>
                        <span class="stat-value">${this.stats.os.arch}</span>
                    </div>
                </div>
            </div>

            <div class="stats-section">
                <h2>Processeur</h2>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Modèle:</span>
                        <span class="stat-value">${this.stats.cpu.manufacturer} ${this.stats.cpu.brand}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Vitesse:</span>
                        <span class="stat-value">${this.stats.cpu.speed}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Cœurs:</span>
                        <span class="stat-value">${this.stats.cpu.cores}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Température:</span>
                        <span class="stat-value">${
                            typeof this.stats.cpu.temperature === 'object'
                            ? this.stats.cpu.temperature.main + '°C'
                            : 'N/A'
                        }</span>
                    </div>
                </div>
            </div>

            <div class="stats-section">
                <h2>Processus</h2>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Total:</span>
                        <span class="stat-value">${this.stats.processes.total}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">En cours:</span>
                        <span class="stat-value">${this.stats.processes.running}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Bloqués:</span>
                        <span class="stat-value">${this.stats.processes.blocked}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">En sommeil:</span>
                        <span class="stat-value">${this.stats.processes.sleeping}</span>
                    </div>
                </div>
            </div>

            <div class="stats-section">
                <h2>Réseau</h2>
                <div class="network-interfaces">
                    ${this.stats.network.map(net => `
                        <div class="network-interface">
                            <h3>${net.iface}</h3>
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <span class="stat-label">IPv4:</span>
                                    <span class="stat-value">${net.ip4}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">IPv6:</span>
                                    <span class="stat-value">${net.ip6}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Vitesse:</span>
                                    <span class="stat-value">${net.speed}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">État:</span>
                                    <span class="stat-value">${net.operstate}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

const statsManager = new StatsManager();