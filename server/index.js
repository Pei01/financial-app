import express from 'express';
import { PORT, NODE_ENV } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the financial-app\'s API');
})

app.listen(PORT, async () => {
    console.log(`Server is running in ${NODE_ENV} mode on http://localhost:${PORT}`);

    await connectToDatabase();
})