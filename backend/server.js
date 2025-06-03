import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

// App config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary()

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.get('/', (req, res) => {
  res.status(200).send("API is runinng");
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
