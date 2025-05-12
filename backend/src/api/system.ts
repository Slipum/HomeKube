import { Request, Response, Router } from 'express';
import os from 'os';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/status', (req: Request, res: Response) => {
	const cpus = os.cpus();
	const load = os.loadavg();
	const totalMem = os.totalmem();
	const freeMem = os.freemem();

	res.json({
		cpuModel: cpus[0]?.model,
		cpuCount: cpus.length,
		loadAvg: load,
		totalMem,
		freeMem,
		usedMem: totalMem - freeMem,
		uptime: os.uptime(),
	});
});

export default router;
