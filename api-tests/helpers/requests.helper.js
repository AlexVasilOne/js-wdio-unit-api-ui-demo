const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const Ajv = require('ajv');

async function sendRequest(
  url,
  data = null,
  isAuthenticated = true,
  method = 'get',
) {
  const token = process.env.TOKEN_CURRENT_USER;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  if (!isAuthenticated) delete headers.Authorization;
  try {
    const response = await axios({
      method,
      url: `${process.env.API_BASE_LINK}${url}`,
      headers,
      data,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data,
    };
  }
}

function createFormData(filePath) {
  const formData = new FormData();
  const fileBuffer = fs.readFileSync(filePath);
  formData.append('file', fileBuffer, {
    contentType: filePath.toLowerCase().endsWith('.txt') ? 'text/plain' : 'text/csv',
    filename: 'sample-file.csv',
  });
  return formData;
}

function validateSchema(schema, response) {
  const ajv = new Ajv({ allErrors: true });
  const valid = ajv.validate(schema, response.data);
  if (!valid) {
    throw new Error(`Schema validation errors: ${ajv.errorsText()}`);
  }
}

module.exports = {
  sendRequest,
  createFormData,
  validateSchema,
};
