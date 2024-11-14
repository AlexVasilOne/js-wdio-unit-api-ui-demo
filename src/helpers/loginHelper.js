class LoginHelper {
  static async login(browser, tokenValue) {
    await browser.url('/assure');
    await browser.execute((tokenValue) => {
      window.localStorage.setItem('token', tokenValue);
    }, tokenValue);
  }
}

module.exports = LoginHelper;
