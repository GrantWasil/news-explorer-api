class NotFoundError extends Error {
  constructor(message) {
    super(message || 'Requested Resource Not Found');
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
