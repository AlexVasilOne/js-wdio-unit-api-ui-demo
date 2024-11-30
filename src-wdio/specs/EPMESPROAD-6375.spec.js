const loadFile = require('./../helpers/fileLoadHelper');
const uploadPage = require('./../po/pages/upload.page'); 

describe('Verify that files uploading', () => {
  beforeEach(async () => {
    await uploadPage.open(); 
  });

  it('Verify that the file can be deleted by clicking on the “x” button.', async () => {
    let uploadLink = await $('//section//div[text()="browse"]');
    await expect(uploadLink).toBeEnabled(); // uploading button is available
    await loadFile('sample-file.csv');
    const fileCard = await $('//section//div[text()="sample-file"]');
    await expect(fileCard).toBeDisplayed(); // file was added
    await $('div button[type="button"]').click(); // file delete button
    uploadLink = $('//section//div[text()="browse"]');
    await expect(uploadLink).toBeEnabled(); // uploading button is available again
  });

  it('Verify impossibility to upload not a .csv file', async () => {
    const previewButton = await $('//button[text()="Preview File"]');
    await loadFile('sample-file.txt');
    previewButton.click();
    const errorDiv = $('//section//div[text()="Error: Invalid file type, only CSV allowed"]');
    await expect(errorDiv).toBeDisplayed();
    await expect(previewButton).not.toBeEnabled();
  });

  it('Verify ability navigate throw upload pages sidebar elemenets using keyboard (a11y)', async () => {
    const homeLink = await $('aside a[href="/assure"]');
    const TAB = '\u0009';
    await homeLink.waitForDisplayed();
    //later we can add more elements 
    // and use tab + shift to navigate back 
    // performActions can be especialy usefuul in that case
    await browser.performActions([{
      type: 'key',
      id: 'keyboard',
      actions: [
        { type: 'keyDown', value: TAB },
        { type: 'keyUp', value: TAB },
      ]
    }]);
    await browser.waitUntil(
      async () => await homeLink.isFocused(),
      { timeout: 2000, interval: 500, timeoutMsg: "not focused" }
    );
    await browser.releaseActions();
  });
});
