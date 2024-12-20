const {
  sendRequest,
} = require('../helpers/requests');

describe('API Test Demo', () => {
  it('GET list of files', async () => {
    const response = await sendRequest('api/file/');
    expect(response.status).to.equal(200);
  });
});
