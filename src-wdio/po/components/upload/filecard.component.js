const BaseComponent = require("../base.component");

class FileCardComponent extends BaseComponent {
  constructor() {
    super('section>div[class*="uui-file_card"]');
  }
  get btnClose() {
    return this.rootEl.$('button div');
  }
}

module.exports = FileCardComponent;