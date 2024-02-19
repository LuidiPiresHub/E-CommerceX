import express, { Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import handleError from './middlewares/handleError';

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (_req: Request, res: Response) => res.json({ message: 'Hello World' }));

app.use('/products', routes.productRoutes);
app.use('/stripe', routes.stripeRoutes);

app.use(handleError);

export default app;
