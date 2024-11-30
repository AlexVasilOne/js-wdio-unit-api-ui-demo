const Page = require('./base.page.js');
const welcomePage = require('./welcome.page');
const login = require('./../../helpers/loginHelper');

class UploadPage extends Page {
  async open() {
    await welcomePage.open(); 
    await login(browser, process.env.TOKEN_CURRENT_USER);
    return welcomePage.btnUploadNewDataset.click();
  };
}

module.exports = new UploadPage();