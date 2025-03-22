import { Router } from 'express';
import { createInvestment, deleteInvestment, getInvestment, getInvestments, updateInvestment } from '../controllers/investment.controller.js';

const investmentRouter = Router();

investmentRouter.get('/', getInvestments);

investmentRouter.get('/:id', getInvestment);

investmentRouter.post('/', createInvestment);

investmentRouter.put('/:id', updateInvestment);

investmentRouter.delete('/:id', deleteInvestment);

export default investmentRouter;