const axios = require('axios');

describe('API Test Demo', () => {
  it('GET list of files', async () => {
    const response = await axios({
      method: 'get',
      url: 'https://aist.lab.epam.com/api-assure/api/file/',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TOKEN_CURRENT_USER}`,
      },
    });
    expect(response.status).to.equal(200); 
  });
});
