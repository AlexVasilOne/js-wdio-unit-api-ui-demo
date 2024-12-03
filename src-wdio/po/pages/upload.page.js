const Page = require('./base.page.js');
const welcomePage = require('./welcome.page');
const login = require('./../../helpers/loginHelper');
const {
  DropComponent,
  FileCardComponent,
  SidePanelComponent
} = require('./../components');

class UploadPage extends Page {
  constructor() {
    super(); 
    this.dropZone = new DropComponent();
    this.fileCard = new FileCardComponent();
    this.sidePanel = new SidePanelComponent(); 
  }
  async open() {
    await welcomePage.open(); 
    await login(process.env.TOKEN_CURRENT_USER);
    return welcomePage.btnUploadNewDataset.click();
  };

  get btnPreviewFile() {
    return $('//button[text()="Preview File"]');
  }
  get btnReset() {
    return $('//button[text()="Reset"]');
  }
}

module.exports = new UploadPage();