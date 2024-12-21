const getApiFileSchema = {
  type: 'object',
  required: ['files', 'total'],
  properties: {
    files: {
      type: 'array',
      items: {
        type: 'string',
        pattern: '.+.csv',
      },
    },
    total: {
      type: 'number',
    },
  },
};

const postApiFileSchema = {
  type: 'object',
  required: ['head_rows', 'footer_rows'],
  properties: {
    head_rows: {
      type: 'array',
      items: {
        type: 'object',
      },
    },
  },
};

module.exports = {
  getApiFileSchema,
  postApiFileSchema,
};
