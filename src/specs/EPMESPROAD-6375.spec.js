const path = require('path');

describe('Verify that files uploading', () => {
  before(async () => {
    await browser.url('/assure');
    await $('//button[text()="+ Upload New Dataset"]').click();
  });
  it('Verify that the file can be deleted by clicking on the “x” button.', async () => {
    let uploadLink = await $('//section//div[text()="browse"]');
    await expect(uploadLink).toBeEnabled(); // uploading button is available
    const filePath = path.join(process.cwd(), 'test-data/sample-file.csv');
    await $('input[type="file"]').addValue(filePath);
    const fileCard = await $('//section//div[text()="sample-file"]');
    await expect(fileCard).toBeDisplayed(); // file was added
    await $('div button[type="button"]').click(); // file delete button
    uploadLink = $('//section//div[text()="browse"]');
    await expect(uploadLink).toBeEnabled(); // uploading button is available again
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
