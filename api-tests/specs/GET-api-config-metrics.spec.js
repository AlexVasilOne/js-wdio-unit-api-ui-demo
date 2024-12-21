const {
  sendRequest,
  validateSchema,
} = require('../helpers/requests.helper');
const { getConfigMetrics } = require('../helpers/schemas');
const { RAGAS, DEEP_EVAL } = require('../helpers/constants');

describe('GET /api/config/metrics', () => {
  it('Verify the ability to get list of metrics', async () => {
    const response = await sendRequest('api/config/metrics');
    expect(response.status).to.equal(200);
    validateSchema(getConfigMetrics, response);
    expect(response.data.Ragas).to.deep.equal(RAGAS);
    expect(response.data.DeepEval).to.deep.equal(DEEP_EVAL);
  });
});
