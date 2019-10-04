const { rightSidebarImageTiles, bottomImageTiles, bottomTextTiles } = require('./find_paid_elements.js')
const fs = require('fs')

const write = function (data, heading) {
  fs.appendFileSync(process.env.DIMENSION_FILE, heading + '\r\n')

  data.forEach(function (entry) {
    fs.appendFileSync(process.env.DIMENSION_FILE, JSON.stringify(entry) + '\r\n')
  })
}

module.exports = async function writeDimensionsInFile (page) {
  let dimensions = await rightSidebarImageTiles(page)
  write(dimensions, 'Right Sidebar Image Tiles')

  dimensions = await bottomImageTiles(page)
  write(dimensions, 'Bottom Image Tiles')

  dimensions = await bottomTextTiles(page)
  write(dimensions, 'Bottom Text Tiles')
}
