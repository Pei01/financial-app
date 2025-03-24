import express from 'express';
import cors from 'cors';
import { PORT, NODE_ENV } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import authRouter from './routes/auth.routes.js';
import investmentRouter from './routes/investment.routes.js';
import authorize from './middlewares/auth.middleware.js';
import verifyToken from './middlewares/verifyToken.middleware.js';

const app = express();

process.env.TZ = 'UTC';

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/investments', verifyToken, authorize, investmentRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the financial-app\'s API');
})

app.listen(PORT, async () => {
    console.log(`Server is running in ${NODE_ENV} mode on http://localhost:${PORT}`);

    await connectToDatabase();
})