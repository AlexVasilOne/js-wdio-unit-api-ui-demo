const path = require('path');

describe('Verify that files uploading', () => {
  before(async () => {
    await browser.url('/assure');
    await $('//button[text()="+ Upload New Dataset"]').click();
  });
  it('Verify that the file can be deleted by clicking on the “x” button.', async () => {
    let uploadLink = $('//section//div[text()="browse"]');
    await expect(uploadLink).toBeClickable(); // uploading button is available
    const filePath = path.join(process.cwd(), 'test-data/sample-file.csv');
    await $('input[type="file"]').addValue(filePath);
    await $('div button[type="button"]').click(); // file delete button
    uploadLink = $('//section//div[text()="browse"]');
    await expect(uploadLink).toBeClickable(); // uploading button is available again
  });
  it('Verify impossibility to upload not a .csv file', async () => {
    const filePath = path.join(process.cwd(), 'test-data/sample-file.txt');
    const previewButton = await $('//button[text()="Preview File"]');
    await $('input[type="file"]').addValue(filePath);
    previewButton.click();
    const errorDiv = $('//section//div[text()="Error: Invalid file type, only CSV allowed"]');
    await expect(errorDiv).toBeDisplayed();
    await expect(previewButton).not.toBeEnabled();
  });
});
