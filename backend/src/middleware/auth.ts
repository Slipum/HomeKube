import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const auth = req.headers.authorization;
	if (!auth || !auth.startsWith('Bearer ')) {
		res.status(401);
		return;
	}
	try {
		const token = auth.split(' ')[1];
		jwt.verify(token, process.env.JWT_SECRET!);
		next();
	} catch (err) {
		res.sendStatus(403);
	}
};
