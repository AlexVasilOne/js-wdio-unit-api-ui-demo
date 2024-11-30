const BaseComponent = require("./base.component");

class SidePanelComponent extends BaseComponent {
  constructor() {
    super('aside'); 
  }
  get homeLink(){
    return this.rootEl.$('a[href="/assure"]');
  }
}

module.exports = SidePanelComponent; 