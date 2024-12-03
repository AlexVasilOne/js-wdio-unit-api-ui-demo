const Page = require('./base.page.js'); 

class WelcomePage extends Page {
  get btnUploadNewDataset () { 
    return $('//button[text()="+ Upload New Dataset"]');
  }; 

  open () {
    return super.open('/assure');
  }
}

module.exports = new WelcomePage(); 