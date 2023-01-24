const { assert } = require("chai");
const { LEVEL } = require("triple-beam");

const logger = require("./logger");

context("core/logger", () => {
  it("logs as expected", (done) => {
    const logs = [];

    logger.transports[0].write = (args) => {
      logs.push(args);

      assert.equal(logs[0].message, "Some error!");
      assert.equal(logs[0][LEVEL], "error");

      done();
    };

    logger.error("Some error!");
  });
});
