import express from 'express';
import dotenv from 'dotenv';
import { startRouterService } from './services/router-service';

const app = express();
const PORT = 3000;
dotenv.config();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

console.log('requesting...');

startRouterService();
