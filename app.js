require('dotenv').config()
const Scraper = require('./scraper.js')
const autoScroll = require('./lib/auto_scroll.js')
const writeDimensions = require('./lib/write_dimensions.js')

async function initScraping () {
  const scraper = await new Scraper()
  try {
    await scraper.setViewPort()
    await scraper.goToUrl()
    await autoScroll(scraper.page)
    await writeDimensions(scraper.page)
    await scraper.takeScreenshot()
    await scraper.closeBrowser()
  } catch (e) {
    console.log('an expection on page.evaluate ', e)
  }
}

initScraping()
