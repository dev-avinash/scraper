const rightSidebarImageTiles = async function (page) {
  const dimensions = await page.evaluate(() => {
    const selector = 'ob-dynamic-rec-container ob-recIdx-0 ob-p'
    const paidElements = document.getElementsByClassName(selector)
    const element = paidElements[paidElements.length - 1]
    const children = element.parentNode.children
    const imageTilesDimensions = []

    for (const e of children) {
      const imgTag = e.getElementsByTagName('img')[0]
      imageTilesDimensions.push(getDimensions(imgTag))
    }

    return imageTilesDimensions
  })

  return dimensions
}

const bottomImageTiles = async function (page) {
  const dimensions = await page.evaluate(() => {
    const selector = 'ob-dynamic-rec-container ob-recIdx-0 ob-p'
    const paidElements = document.getElementsByClassName(selector)
    const element = paidElements[0]
    const children = element.parentNode.children
    const imageTilesDimensions = []

    for (const e of children) {
      const imgTag = e.getElementsByTagName('img')[0]
      imageTilesDimensions.push(getDimensions(imgTag))
    }

    return imageTilesDimensions
  })

  return dimensions
}

const bottomTextTiles = async function (page) {
  const dimensions = await page.evaluate(() => {
    const selector = '.ob-widget-items-container'
    const parent = document.getElementsByClassName('OB_AR_13')[0].querySelector(selector)
    const children = parent.children
    const textTilesDimensions = []
    for (const e of children) {
      textTilesDimensions.push(getDimensions(e))
    }

    return textTilesDimensions
  })

  return dimensions
}

module.exports = {
  rightSidebarImageTiles: rightSidebarImageTiles,
  bottomImageTiles: bottomImageTiles,
  bottomTextTiles: bottomTextTiles
}
