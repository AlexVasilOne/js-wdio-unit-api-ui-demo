const FileLoadHelper = require('../helpers/fileLoadHelper');
const LoginHelper = require('../helpers/loginHelper');

describe('Verify that files uploading', () => {
  before(async () => {
    LoginHelper.login(browser, process.env.TOKEN_CURRENT_USER);
    await $('//button[text()="+ Upload New Dataset"]').click();
  });
  it('Verify that the file can be deleted by clicking on the “x” button.', async () => {
    let uploadLink = await $('//section//div[text()="browse"]');
    await expect(uploadLink).toBeEnabled(); // uploading button is available
    await FileLoadHelper.loadFile('sample-file.csv');
    const fileCard = await $('//section//div[text()="sample-file"]');
    await expect(fileCard).toBeDisplayed(); // file was added
    await $('div button[type="button"]').click(); // file delete button
    uploadLink = $('//section//div[text()="browse"]');
    await expect(uploadLink).toBeEnabled(); // uploading button is available again
  });
  it('Verify impossibility to upload not a .csv file', async () => {
    const previewButton = await $('//button[text()="Preview File"]');
    await FileLoadHelper.loadFile('sample-file.txt');
    previewButton.click();
    const errorDiv = $('//section//div[text()="Error: Invalid file type, only CSV allowed"]');
    await expect(errorDiv).toBeDisplayed();
    await expect(previewButton).not.toBeEnabled();
  });
});
