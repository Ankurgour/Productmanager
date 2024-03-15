import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './controller/Registter.js';
// import registerRoute from '../controller/User.js


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
console.log("port",PORT);


app.use('/api',router);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
