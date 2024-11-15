const path = require('path');
class FileLoadHelper {
  static async loadFile(fileName){
    const filePath = path.join(process.cwd(), `test-data/${fileName}`);
    console.log(filePath);
    await $('input[type="file"]').addValue(filePath);
    // if file quite big or slow connection
    //it can take a time to download file
    const xpath = `//section//div[text()="${fileName.slice(0, -4)}"]`;
    console.log(xpath);
    await browser.waitUntil(
      async () => await $(xpath).isDisplayed(),
      { timeout: 5000, interval: 500, timeoutMsg: "file not loaded" }
    );
  }
}
module.exports = FileLoadHelper;