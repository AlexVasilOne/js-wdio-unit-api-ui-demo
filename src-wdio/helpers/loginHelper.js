async function login(browser, tokenValue) {
  await browser.execute((tokenValue) => {
    window.localStorage.setItem('token', tokenValue);
  }, tokenValue);
};
module.exports = login;
