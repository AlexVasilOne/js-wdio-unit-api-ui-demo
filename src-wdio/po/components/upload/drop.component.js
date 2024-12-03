const BaseComponent = require("../base.component");

class DropComponent extends BaseComponent {
  constructor() {
    super('//section//input[@type="file"]/ancestor::div[3]');
  }
  get input() {
    return this.rootEl.$('input[type="file"]');
  }
  get btnBrowse() {
    return this.rootEl.$('button');
  }
}

module.exports = DropComponent; 