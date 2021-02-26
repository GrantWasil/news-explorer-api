class InvalidDataError extends Error {
  constructor(message) {
    super(message || 'Invalid Data Passed to Method.');
    this.statusCode = 400;
  }
}

module.exports = InvalidDataError;
