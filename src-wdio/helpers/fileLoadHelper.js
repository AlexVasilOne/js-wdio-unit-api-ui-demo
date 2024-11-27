const path = require('path');
async function loadFile(fileName) {
  const filePath = path.join(process.cwd(), `test-data/${fileName}`);
  await $('input[type="file"]').addValue(filePath);
  //it can take a time to download a file
  const xpath = `//section//div[text()="${fileName.slice(0, -4)}"]`;
  await browser.waitUntil(
    async () => await $(xpath).isDisplayed(),
    { timeout: 5000, interval: 500, timeoutMsg: "file not loaded" }
  );
}

module.exports = loadFile; 