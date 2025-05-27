import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';

// App config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// API endpoints
app.get('/', (req, res) => {
  res.status(200).send("API is running");
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
