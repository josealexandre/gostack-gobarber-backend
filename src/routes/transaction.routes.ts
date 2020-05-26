import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import ListTransactionsService from '../services/ListTransactionsService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const listTransactionsService = new ListTransactionsService(
      transactionsRepository,
    );

    const transactionsList = listTransactionsService.execute();

    return response.json(transactionsList);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const transaction = request.body;

    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const newTransaction = createTransactionService.execute(transaction);

    return response.json(newTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
