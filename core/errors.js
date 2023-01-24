class BadRequestError extends Error {
  constructor(...params) {
    super(...params);

    this.status = 400;
  }
}

class NotFoundError extends Error {
  constructor(...params) {
    super(...params);

    this.status = 404;
  }
}

class InternalError extends Error {
  constructor(...params) {
    super(...params);

    this.status = 500;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  InternalError,
};
