const rp = require('request-promise');
const cheerio = require('cheerio');

const scrappingSite = async(url) => {
  const html = await rp(url)
  const $ = await cheerio.load(html);
  const table = $('#curs_special')
  const tr =  table.find('tr')
  const result = [];
  for (let i = 0; i < tr.length; i++) {
    if (i !== 0) {
      result.push({
        date: tr[i].children[0].children[0].data, 
        val: tr[i].children[2].children[0].data
      })
    }      
  }
  return result
}


module.exports = {
  scrappingSite
}