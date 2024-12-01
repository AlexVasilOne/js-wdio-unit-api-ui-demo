const BaseComponent = require("../base.component");

class MetricsBlockComponent extends BaseComponent {
  /**
   * 
   * @param {'Select RAGAS Metrics' | 'Select DeepEval Metrics'} blockName 
   */
  constructor(blockName) {
    super(`//h4[text()="${blockName}"]/ancestor::div[1]`);
    this.blockName = blockName;
  }
  get header() {
    return this.rootEl.$(`//h4[text()="${this.blockName}"]`);
  }
  get allLabels() {
    return this.rootEl.$$('label[class*="checkbox"]');
  }
  get allIputs() {
    return this.rootEl.$$('input[type="checkbox"]');
  }
  get btnSelectAll() {
    return this.rootEl.$('//div[text()="Select All Metrics"]');
  }
  getCheckBoxHeader(name) {
    return this.rootEl.$(`//h4[text()="${name}"]`);
  }
  getCheckBoxInput(name) {
    return this.rootEl.$(`//h4[text()="${name}"]/ancestor::label[1]//input[@type="checkbox"]`);
  }
}

module.exports = MetricsBlockComponent; 