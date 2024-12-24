const {
  sendRequest,
  createFormData,
  validateSchema,
} = require('../helpers/requests.helper');
const { getApiFileSchema } = require('../helpers/schemas');

describe('GET /api/file/', () => {
  before(async () => {
    const formData = createFormData('./src-wdio/test-data/sample-file.csv');
    await sendRequest('api/file/', formData, true, 'post');
  });
  after(async () => {
    await sendRequest('api/file/sample-file.csv', null, true, 'delete');
  });
  it('Verify ability to get user"s files list', async () => {
    const response = await sendRequest('api/file/');
    expect(response.status).to.equal(200);
    validateSchema(getApiFileSchema, response);
    expect(response.data.files).to.include('sample-file.csv');
    expect(response.data.total).to.equal(1);
  });
  it('Verify impossibility of getting user"s file list w/o Authentication', async () => {
    const response = await sendRequest('api/file/', null, false, 'get');
    expect(response.status).to.equal(403);
    expect(response.message.detail).to.equal('Not authenticated');
  });
});
