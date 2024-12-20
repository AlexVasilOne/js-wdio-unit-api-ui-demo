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

module.exports = {
  getApiFileSchema,
};
