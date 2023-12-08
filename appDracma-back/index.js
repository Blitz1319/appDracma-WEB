require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const alunosRoutes = require('./routers/alunos');
const livrosRoutes = require('./routers/livros');
const professoresRoutes = require('./routers/professor');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/alunos', alunosRoutes);
app.use('/livros', livrosRoutes);
app.use('/professores', professoresRoutes);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vhiakv0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connected to the database!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
