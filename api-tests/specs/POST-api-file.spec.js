const {
  sendRequest,
  createFormData,
  validateSchema,
} = require('../helpers/requests.helper');
const { postApiFileSchema } = require('../helpers/schemas');

describe('POST /api/file', () => {
  after(async () => {
    await sendRequest('api/file/sample-file.csv', null, true, 'delete');
  });
  it('Verify ability to download a valid CSV file in user folder', async () => {
    const formData = createFormData('./src-wdio/test-data/sample-file.csv');
    const postResponse = await sendRequest('api/file/', formData, true, 'post');
    expect(postResponse.status).to.equal(200);
    validateSchema(postApiFileSchema, postResponse);
    const getResponse = await sendRequest('api/file/');
    expect(getResponse.data.files).to.include('sample-file.csv');
  });
  it('Verify impossibility to download not a CSV file', async () => {
    const formData = createFormData('./src-wdio/test-data/sample-file.txt');
    const postResponse = await sendRequest('api/file/', formData, true, 'post');
    expect(postResponse.status).to.equal(400);
    expect(postResponse.message.detail).to.equal('Invalid file type, only CSV allowed');
    const getResponse = await sendRequest('api/file/');
    expect(getResponse.data.files).not.to.include('sample-file.txt');
  });
});
