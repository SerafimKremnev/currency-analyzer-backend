const express = require('express');
const sequelize = require('./db');
const NewsController = require('./controller/newsController');
const models = require('./models/models');
const cors = require('cors')

require('dotenv').config();

const PORT = process.env.PORT || 8000
const app = express();
app.use(express.json())

app.get('/api/news', (req, res) => {
  NewsController.getAllNews(req, res)
})

app.post('/api/news', (req, res) => {
    NewsController.createNew(req, res)
})

app.get('/api/news/:id', (req, res) => {
  NewsController.getNewById(req, res)
})

app.get('/api/values', (req, res) => {
  NewsController.getCurrency(req, res)
})

app.get('/api/history-values', (req, res) => {
  NewsController.getCurrencyHistory(req, res)
})

app.delete('/api/news/:id', (req, res) => {
  NewsController.deleteById(req, res)
})

const start = async () => {
  try {
    const d = await sequelize.authenticate()
    const r = await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`app started on port ${PORT}`)
    })
  } catch(e) {
    console.log(e)
  }
}



start()