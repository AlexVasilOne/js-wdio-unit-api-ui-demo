const path = require('path');
class FileLoadHelper {
  static async loadFile(fileName){
    const filePath = path.join(process.cwd(), `test-data/${fileName}`);
    await $('input[type="file"]').addValue(filePath);
    // if file quite big or slow connection
    //it can take a time to download file
    const fileCard = await $('//section//div[text()="sample-file"]');
    await browser.waitUntil(
      async () => await $(fileCard).isDisplayed(),
      { timeout: 5000, interval: 500, timeoutMsg: "file not loaded" }
    );
  }
}
module.exports = FileLoadHelper;