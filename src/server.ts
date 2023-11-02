import express from 'express';
import dotenv from 'dotenv';
import { startRouterService } from './services/router-service';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

console.log('requesting...');

startRouterService();
