const sequelize = require('../db') 
const { New } = require('../models/models');
const {getHistoricalExchangeRates} = require('../api/getCurrencyValues')
const {scrappingSite} = require('../api/scrapping')

class NewsController {
  async createNew(req, res) {
    const { title, content, image, description } = req.body;
    console.log(req.body)
    const newNews = await New.create({
      title,
      content,
      image,
      description,
    });
    res.status(200).json(newNews);
  }
  async getAllNews(req, res) {
    const allNews = await New.findAll();
    res.json(allNews);
  }
  async getNewById(req, res) {
    const { id } = req.params;
    try {
      const article = await New.findOne({where: {id}})
      if (!article) {
        res.status(404).json({message: "Not Found Article"});
        return
      }
      res.status(200).json(article);
    } catch (error) {
      console.error('Error fetching article by id', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async deleteById(req, res) {
    const { id } = req.params;
    try {
      const article = await New.findOne({where: {id}})
      if (!article) {
        res.status(404).json({message: "Not Found Article"});
        return
      }
      article.destroy()
      res.status(200).json({message: "success delete"});
    } catch (error) {
      console.error('Error fetching article by id', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async getCurrency(req, res) {
    const params = req.query;
    try {
      const data = await getHistoricalExchangeRates(
        params?.base || "RUB",
      )
      return res.status(200).json({
        CNY: data.conversion_rates.CNY,
        USD: data.conversion_rates.USD,
        EUR: data.conversion_rates.EUR,
        RUB: data.conversion_rates.RUB,
      })
    } catch (error) {
      console.error('Error fetching article by id', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async getCurrencyHistory(req, res) {
    try {
      const params = req.query;
      const resultEur = await scrappingSite(`https://russian-trade.com/kursy-valyut/evro/posledniy-mesyats-30-dney/`);
      const resultUsd = await scrappingSite(`https://russian-trade.com/kursy-valyut/dollar-ssha/posledniy-mesyats-30-dney/`);
      const resultCny = await scrappingSite(`https://russian-trade.com/kursy-valyut/kitayskiy-yuan/posledniy-mesyats-30-dney/`);
     
      res.status(200).json({
        EUR: resultEur,
        USD: resultUsd,
        CNY: resultCny,
      });
    } catch (error) {
      console.error('Error fetching article by id', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new NewsController()