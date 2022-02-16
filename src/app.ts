import dotenv from 'dotenv';
import colors from 'colors';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

colors.enable();

export const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
