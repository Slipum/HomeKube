import Docker from 'dockerode';
import { Request, Response, Router } from 'express';
import { authenticate } from '../middleware/auth';

const docker = new Docker();
const router = Router();

router.use(authenticate);

// Получаем список контейнеров
router.get('/', async (req: Request, res: Response) => {
	const containers = await docker.listContainers({ all: true });
	res.json(containers);
});

// Запуск контейнера
router.post('/:id/start', async (req: Request, res: Response) => {
	try {
		const container = docker.getContainer(req.params.id);
		await container.start();
		res.json({ message: 'Container started!' });
	} catch (err) {
		res.status(500).json({ error: 'Container start error' });
	}
});

// Остановка контейнера
router.post('/:id/stop', async (req: Request, res: Response) => {
	try {
		const container = docker.getContainer(req.params.id);
		await container.stop();
		res.json({ message: 'Container stoped!' });
	} catch (err) {
		res.status(500).json({ error: 'Container stop error' });
	}
});

// Удаление контейнера
router.delete('/:id', async (req: Request, res: Response) => {
	try {
		const container = docker.getContainer(req.params.id);
		await container.remove({ force: true });
		res.json({ message: 'Container is delete!' });
	} catch (err) {
		res.status(500).json({ error: 'Container delete error' });
	}
});

export default router;
