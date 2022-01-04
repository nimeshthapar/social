class HttpError extends Error {
  constructor(msg, errCode) {
    super(msg);
    this.statusCode = errCode;
  }
}

module.exports = HttpError;
