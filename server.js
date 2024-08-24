const express = require('express');
const si = require('systeminformation');
const app = express();
const port = 8000;

app.use(express.static('public'));

app.get('/api/stats', async (req, res) => {
    try {
        const [cpuLoad, memory, disk, time] = await Promise.all([
            si.currentLoad(),
            si.mem(),
            si.fsSize(),
            si.time()
        ]);

        console.log('CPU Load:', cpuLoad);
        console.log('Memory:', memory);
        console.log('Disk:', disk);
        console.log('Time:', time);

        if (!cpuLoad || !memory || !disk || !time) {
            throw new Error('Données système non disponibles');
        }

        const stats = {
            cpu_usage: cpuLoad.currentLoad ? cpuLoad.currentLoad.toFixed(2) : 'N/A',
            memory_total: (memory.total / (1024 ** 3)).toFixed(2),
            memory_used: (memory.used / (1024 ** 3)).toFixed(2),
            disk_total: disk.reduce((acc, disk) => acc + (disk.size || 0), 0) / (1024 ** 3),
            disk_used: disk.reduce((acc, disk) => acc + (disk.used || 0), 0) / (1024 ** 3),
            uptime: time.uptime
        };

        res.json(stats);
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques :', error.message || error);
        res.status(500).json({ error: 'Erreur lors de la récupération des statistiques', message: error.message || error });
    }
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});