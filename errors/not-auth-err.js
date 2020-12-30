class NotAuthorizedError extends Error {
  constructor(message) {
    super(message || 'Not Authorized');
    this.statusCode = 401;
  }
}

module.exports = NotAuthorizedError;
