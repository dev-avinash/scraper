require('dotenv').config()
const fs = require('fs')
const Scraper = require('../scraper.js')
describe('Scraper', () => {
  beforeAll(async () => {
    jest.setTimeout(30000)
    scraper = await new Scraper()
  })

  afterAll(async () => {
    await scraper.closeBrowser()
    fs.unlinkSync('test.png')
  })

  describe('#goToUrl', () => {
    it('should take to url', async () => {
      await scraper.goToUrl()
      await expect(scraper.page.title()).resolves.toMatch('Official: Increasing confidence debris is from MH370 - CNN')
    }, 30000)

    it('should raise error with invalid url', async () => {
      try {
        await scraper.goToUrl('https://https://example.com')
      } catch (e) {
        expect(e.message).toBe('net::ERR_NAME_NOT_RESOLVED at https://https://example.com')
      }
    })
  })

  describe('#setViewPort', () => {
    it('should set width and height of viewport to 1200', async () => {
      await scraper.setViewPort()
      await scraper.goToUrl()
      const dimensions = await scraper.page.evaluate(() => {
        return {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight
        }
      })
      expect(dimensions).toEqual({ width: 1200, height: 1200 })
    })

    it('should set width and height of viewport to passed argument', async () => {
      await scraper.setViewPort(800, 800)
      await scraper.goToUrl()
      const dimensions = await scraper.page.evaluate(() => {
        return {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight
        }
      })
      expect(dimensions).toEqual({ width: 800, height: 800 })
    })
  })

  describe('#takeScreenshot', () => {
    it('test', async () => {
      expect(fs.existsSync('test.png')).toBeFalsy()
      await scraper.goToUrl()
      await scraper.takeScreenshot('test.png')
      expect(fs.existsSync('test.png')).toBeTruthy()
    })
  })
})
