class BaseComponent {
  constructor(rootSelector) {
    this.rootSelector = rootSelector;
  }
  get rootEl() {
    return $(this.rootSelector); 
  }
}

module.exports = BaseComponent; 