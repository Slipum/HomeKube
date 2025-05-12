import cors from 'cors';
import express from 'express';
import authRoutes from './api/auth';
import containerRoutes from './api/containers';
import systemRoutes from './api/system';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/containers', containerRoutes);
app.use('/api/system', systemRoutes);

export default app;
