const response = (response = {}) => {
  const responseObject = {
    code: response.statusCode,
    message: response.message,
    data: {},
  };

  if (response.type) {
    responseObject.data.type = response.type;
  }

  if (response.data) {
    responseObject.data.attributes = response.data;
  }

  if (response.token) {
    responseObject.data.token = response.tokens;
  }

  return responseObject;
};

module.exports = response;
