const { expect } = require("chai");
const { BadRequestError, NotFoundError, InternalError } = require("./errors");

describe("core/errors", () => {
  it("BadRequestError", () => {
    const error = new BadRequestError();

    expect(error.status).to.equal(400);
  });

  it("NotFoundError", () => {
    const error = new NotFoundError();

    expect(error.status).to.equal(404);
  });

  it("InternalError", () => {
    const error = new InternalError();

    expect(error.status).to.equal(500);
  });
});
