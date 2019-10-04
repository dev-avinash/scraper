const puppeteer = require('puppeteer')
const pathToExtension = require('path').join(__dirname, 'abp_chrome')

class Scraper {
  constructor () {
    return (async () => {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
        '--no-sandbox',
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`
        ]
      })

      await this.buildPageWithUserAgent()

      return this
    })()
  }

  async goToUrl (url = process.env.SITE_URL) {
    await this.page.goto(url, { waitUntil: process.env.WAIT_UNTIL, timeout: 0 })
    await this.setWait()
    await this.addDimensionMethodToPage()
  }

  async closeBrowser () {
    await this.browser.close()
  }

  async takeScreenshot (file_path = process.env.SCREENSHOT_FILE) {
    await this.page.screenshot({ path: file_path, fullPage: true })
  }

  async setViewPort (width = 1200, height = 1200) {
    await this.page.setViewport({ width: width, height: height })
  }

  async buildPageWithUserAgent (user_agent = process.env.USER_AGENT) {
    this.page = await this.browser.newPage()
    await this.page.setUserAgent(user_agent)
  }

  async addDimensionMethodToPage () {
    await this.page.evaluate(() => {
      window.getDimensions = function (element) {
        const rect = element.getBoundingClientRect()
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        }
      }
    })
  }

  async setWait (selector = '.OUTBRAIN') {
    await this.page.waitForSelector(selector)
  }
}

module.exports = Scraper
