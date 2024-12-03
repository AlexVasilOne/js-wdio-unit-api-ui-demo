const loadFile = require('./../helpers/fileLoadHelper');
const uploadPage = require('./../po/pages/upload.page'); 

describe('Verify that files uploading', () => {
  beforeEach(async () => {
    await uploadPage.open(); 
  });

  it('Verify that the file can be deleted by clicking on the “x” button.', async () => {
    await expect(uploadPage.dropZone.btnBrowse).toBeEnabled();
    await loadFile(uploadPage, 'sample-file.csv');
    await expect(uploadPage.fileCard.rootEl).toBeDisplayed();
    await uploadPage.fileCard.btnClose.click();
    await expect(uploadPage.btnPreviewFile).not.toBeEnabled();
    await expect(uploadPage.dropZone.btnBrowse).toBeEnabled();
  });

  it('Verify that the file can be deleted by clicking on the “Reset” button.', async () => {
    await expect(uploadPage.dropZone.btnBrowse).toBeEnabled();
    await loadFile(uploadPage, 'sample-file.csv');
    await expect(uploadPage.fileCard.rootEl).toBeDisplayed();
    await uploadPage.btnReset.click();
    await expect(uploadPage.btnPreviewFile).not.toBeEnabled();
    await expect(uploadPage.dropZone.btnBrowse).toBeEnabled();
  });

  it('Verify impossibility to upload not a .csv file', async () => {
    await loadFile(uploadPage,'sample-file.txt');
    uploadPage.btnPreviewFile.click();
    const errorDiv = await $('//section//div[text()="Error: Invalid file type, only CSV allowed"]');
    await expect(errorDiv).toBeDisplayed();
    await expect(uploadPage.btnPreviewFile).not.toBeEnabled();
  });

  it('Verify ability navigate throw upload pages sidebar elemenets using keyboard (a11y)', async () => {
    const TAB = '\u0009';
    await uploadPage.sidePanel.homeLink.waitForDisplayed();
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
      async () => await uploadPage.sidePanel.homeLink.isFocused(),
      { timeout: 2000, interval: 500, timeoutMsg: "not focused" }
    );
    await browser.releaseActions();
  });
});
