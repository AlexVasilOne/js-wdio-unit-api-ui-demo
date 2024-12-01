const Page = require('./base.page');
const uploadPage = require('./upload.page');
const loadFile = require('./../../helpers/fileLoadHelper');
const { MetricsBlockComponent } = require('./../components');

class CheckBoxesPage extends Page {
  constructor() {
    super();
    this.ragasBlock = new MetricsBlockComponent('Select RAGAS Metrics'); 
    this.deepEvalBlock = new MetricsBlockComponent('Select DeepEval Metrics');
  }
  async open(){
    await uploadPage.open();
    await loadFile(uploadPage, 'sample-file.csv');
    await uploadPage.btnPreviewFile.click(); 
    return $('//button[text()="Select Metrics"]').click();
  }
  /**
   * 
   * @param {'back' | 'reset' | 'start'} name 
   * @returns {*}
   */
  button(name) {
    const selectors = {
      back: '//button[text()="Back"]',
      reset: '//button[text()="Reset"]',
      start: '//button[text()="Start Test Campaign"]'
    };
    return $(selectors[name]); 
  }
  get allLabels() {
    return $$('label[class*="checkbox"]');
  }
  get allDivs() {
    return $$('div[class*="checkbox"]');
  }
}

module.exports = new CheckBoxesPage(); 