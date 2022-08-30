class ErrorInternalServer extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.code = 500;
  }
}

module.exports = {
  ErrorInternalServer,
};
