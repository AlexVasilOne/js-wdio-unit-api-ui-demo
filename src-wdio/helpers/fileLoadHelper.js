const path = require('path');
async function loadFile(uploadPage, fileName) {
  const filePath = path.join(process.cwd(), `src-wdio/test-data/${fileName}`);
  await uploadPage.dropZone.input.addValue(filePath);
  await browser.waitUntil(
    async () => await uploadPage.fileCard.rootEl.isDisplayed(),
    { timeout: 5000, interval: 500, timeoutMsg: "file not loaded" }
  );
}

module.exports = loadFile; 