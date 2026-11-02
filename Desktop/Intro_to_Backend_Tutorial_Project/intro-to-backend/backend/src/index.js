import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Intro to Backend API is running!' });
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use(errorHandler);

const port = process.env.PORT || 4000;

async function start() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from .env');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');
    app.listen(port, () => console.log(`API running at http://localhost:${port}`));
  } catch (error) {
    console.error('Could not start API:', error.message);
    process.exit(1);
  }
}

start();
