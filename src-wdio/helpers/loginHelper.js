async function login(tokenValue) {
  await browser.execute((tokenValue) => {
    window.localStorage.setItem('token', tokenValue);
  }, tokenValue);
};
module.exports = login;
