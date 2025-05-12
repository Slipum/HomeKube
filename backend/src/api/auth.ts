import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import {
	isPasswordSet,
	setAdminPassword,
	verifyPassword,
} from '../services/adminService';

const router: Router = express.Router();

router.post('/setup', async (req: Request, res: Response): Promise<any> => {
	if (!isPasswordSet())
		return res.status(400).json({ error: 'Password already set' });

	const { password } = req.body;
	if (!password || password.length < 6) {
		return res
			.status(400)
			.json({ error: 'Password is short (min. 6 symbols)' });
	}
	await setAdminPassword(password);
	res.json({ message: 'Admin password set' });
});

router.post('/login', async (req: Request, res: Response): Promise<any> => {
	if (!isPasswordSet()) {
		return res
			.status(400)
			.json({ error: 'Admin password has not yet been set' });
	}

	const { password } = req.body;
	const valid = await verifyPassword(password);
	if (!valid) return res.status(401).json({ error: 'Ivalid password' });

	const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET!, {
		expiresIn: '1h',
	});
	res.json({ token });
});

export default router;
