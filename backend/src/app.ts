import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import routes from './routes';
import handleError from './middlewares/handleError';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (_req: Request, res: Response) => res.json({ message: 'Hello World' }));

app.use('/products', routes.productRoutes);
app.use('/stripe', routes.stripeRoutes);
app.use('/user', routes.userRoutes);
app.use('/cart', routes.cartRouter);

app.use(handleError);

export default app;
