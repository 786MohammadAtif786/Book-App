// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
//const multilingualMiddleware = require('./middlewares/multilingualMiddleware');

const connectDb = require("./config/db");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000



app.use(express.json());

  
  connectDb()
  // Multilingual Middleware
  //app.use(multilingualMiddleware);
  
  
  // Routes
  app.use('/api/users', authRoutes);
  app.use('/api/books', bookRoutes);
  app.use('/api/libraries', libraryRoutes);
  app.use('/api', borrowRoutes);
  
  app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message });
  });
  


  app.listen((PORT), () => {
    console.log(`Server is listen ${PORT}`);
  })


  