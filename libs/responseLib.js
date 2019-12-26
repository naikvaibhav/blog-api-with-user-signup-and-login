let generate = (err, msg, status, data) => {
  let response = {
    error: err,
    message: msg,
    status: status,
    data: data
  };
  return response;
};

module.exports = {
  generate: generate
};
