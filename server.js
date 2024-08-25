const express = require('express');
const si = require('systeminformation');

const app = express();
const port = 8000;

app.use(express.static('public'));

app.get('/api/stats', async (_, res) => {
    try {
        const [cpuLoad, memory, disk, time, osInfo, cpuInfo, cpuTemp, networkInterfaces, processes, fsStats] = await Promise.all([
            si.currentLoad(),
            si.mem(),
            si.fsSize(),
            si.time(),
            si.osInfo(),
            si.cpu(),
            si.cpuTemperature(),
            si.networkInterfaces(),
            si.processes(),
            si.fsStats()
        ]);

        const stats = {
            os: {
                platform: osInfo.platform,
                distro: osInfo.distro,
                release: osInfo.release
            },
            cpu: {
                manufacturer: cpuInfo.manufacturer,
                brand: cpuInfo.brand,
                speed: cpuInfo.speed + ' GHz',
                cores: cpuInfo.cores,
                physicalCores: cpuInfo.physicalCores,
                temperature: cpuTemp.main ? cpuTemp : 'N/A'
            },
            cpu_usage: cpuLoad.currentLoad.toFixed(2),
            memory_total: (memory.total / (1024 ** 3)).toFixed(2),
            memory_used: (memory.used / (1024 ** 3)).toFixed(2),
            disk_total: disk.reduce((acc, disk) => acc + disk.size, 0) / (1024 ** 3),
            disk_used: disk.reduce((acc, disk) => acc + disk.used, 0) / (1024 ** 3),
            uptime: time.uptime,
            network: networkInterfaces.map(net => ({
                iface: net.iface,
                ip4: net.ip4,
                speed: net.speed ? `${net.speed} Mbps` : 'N/A'
            })),
            processes: {
                total: processes.all,
                running: processes.running
            },
            fs_stats: {
                rx: (fsStats.rx / (1024 ** 2)).toFixed(2) + ' MB',
                wx: (fsStats.wx / (1024 ** 2)).toFixed(2) + ' MB',
                tx_sec: (fsStats.tx_sec / (1024 ** 2)).toFixed(2) + ' MB/s',
                rx_sec: (fsStats.rx_sec / (1024 ** 2)).toFixed(2) + ' MB/s'
            }
        };

        res.json(stats);
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des statistiques', message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
