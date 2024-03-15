import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './controller/Registter.js';
import fetch from 'node-fetch';
import Product from './models/Product.js';
import path from 'path';
import { fileURLToPath } from 'url'; 
import productRouter from './controller/Product.js'

const __filename = fileURLToPath(import.meta.url); // Get current file's path
const __dirname = path.dirname(__filename);
// import registerRoute from '../controller/User.js


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;
console.log("port",PORT);


app.use('/api',router);
app.use('/api',productRouter);
// const fetchAndStoreProducts = async () => {
//   try {
//     const response = await fetch('https://64e0caef50713530432cafa1.mockapi.io/api/products');
//     const products = await response.json();
//     console.log(products);

//     await Product.deleteMany({});

//     const formattedProducts = products.map(({ productName, price, image, productDescription, department, id }) => ({
//       name: productName,
//       price: parseFloat(price), 
//       images: [image], 
//       description: productDescription,
//       department,
//       id: parseInt(id) 
//     }));

//     await Product.insertMany(formattedProducts);
//     console.log('Products fetched and stored successfully');
//   } catch (error) {
//     console.error('Failed to fetch or store products:', error);
//   }
// };
// fetchAndStoreProducts();
// app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/assets', express.static('assets'));


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
