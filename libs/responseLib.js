let generate = (err, msg, status, data) => {
  let response = {
    error: err,
    status: status,
    message: msg,
    data: data
  };
  return response;
};

module.exports = {
  generate: generate
};
