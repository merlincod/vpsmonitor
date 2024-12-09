const express = require('express');
const si = require('systeminformation');

const app = express();
const port = 8000;

app.use(express.static('public'));

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

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
                release: osInfo.release,
                arch: osInfo.arch,
                hostname: osInfo.hostname,
                kernel: osInfo.kernel
            },
            cpu: {
                manufacturer: cpuInfo.manufacturer,
                brand: cpuInfo.brand,
                speed: cpuInfo.speed + ' GHz',
                cores: cpuInfo.cores,
                physicalCores: cpuInfo.physicalCores,
                temperature: cpuTemp.main ? {
                    main: cpuTemp.main.toFixed(1),
                    cores: cpuTemp.cores?.map(temp => temp.toFixed(1)) || []
                } : 'N/A'
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
                ip6: net.ip6,
                speed: net.speed ? `${net.speed} Mbps` : 'N/A',
                type: net.type,
                operstate: net.operstate
            })),
            processes: {
                total: processes.all,
                running: processes.running,
                blocked: processes.blocked,
                sleeping: processes.sleeping
            },
            fs_stats: {
                rx: formatBytes(fsStats.rx),
                wx: formatBytes(fsStats.wx),
                tx_sec: formatBytes(fsStats.tx_sec) + '/s',
                rx_sec: formatBytes(fsStats.rx_sec) + '/s'
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