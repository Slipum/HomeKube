import bcrypt from 'bcrypt';
import fs from 'fs';
const ADMIN_FILE = '.admin';

export const isPasswordSet = (): boolean => {
	return fs.existsSync(ADMIN_FILE);
};

export const setAdminPassword = async (password: string): Promise<void> => {
	const hash = await bcrypt.hash(password, 10);
	fs.writeFileSync(ADMIN_FILE, hash);
};

export const verifyPassword = async (password: string): Promise<boolean> => {
	const hash = fs.readFileSync(ADMIN_FILE, 'utf-8');
	return await bcrypt.compare(password, hash);
};
