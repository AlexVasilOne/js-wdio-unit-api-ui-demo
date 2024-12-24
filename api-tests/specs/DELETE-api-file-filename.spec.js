const {
  sendRequest,
  createFormData,
} = require('../helpers/requests.helper');

describe('DELETE /api/file/{filename}', () => {
  beforeEach(async () => {
    const formData = createFormData('./src-wdio/test-data/sample-file.csv');
    await sendRequest('api/file/', formData, true, 'post');
  });
  afterEach(async () => {
    await sendRequest('api/file/sample-file.csv', null, true, 'delete');
  });
  it('Verify ability to delete existed file', async () => {
    const deleteResponse = await sendRequest('api/file/sample-file.csv', null, true, 'delete');
    expect(deleteResponse.status).to.equal(200);
    expect(deleteResponse.data.message).to.equal('sample-file.csv was deleted');
    const getResponse = await sendRequest('api/file/');
    expect(getResponse.data.files).not.to.include('sample-file.csv');
  });
  it('Verify response message for not existed file', async () => {
    const deleteResponse = await sendRequest('api/file/notExisted.csv', null, true, 'delete');
    expect(deleteResponse.status).to.equal(404);
    expect(deleteResponse.message.detail).to.equal('notExisted.csv doesn\'t exist');
  });
  it('Verify impossibility to delete file without authentication', async () => {
    const deleteResponse = await sendRequest('api/file/sample-file.csv', null, false, 'delete');
    expect(deleteResponse.status).to.equal(403);
    expect(deleteResponse.message.detail).to.equal('Not authenticated');
  });
});
