const request = require("supertest");
const { Praise } = require("../models");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const router = require("./praise");

app.use(bodyParser.json());
app.use(router);

// Mocks
const user_1 = {
  _id: "000000000000000000000001",
  firstname: "Some",
  lastname: "User",
};
const user_2 = {
  _id: "000000000000000000000002",
  firstname: "Another",
  lastname: "Person",
};

const praise_1 = {
  _id: "100000000000000000000001",
  sender: user_1._id,
  receiver: user_2._id,
  content: "Great job!",
};
const praise_2 = {
  _id: "100000000000000000000002",
  sender: user_2._id,
  receiver: user_1._id,
  content: "Fantastic presentation!",
};

const praise = {
  sender: user_1._id,
  receiver: user_2._id,
  content: "New Praise!",
};

describe("api/praise", () => {
  describe("GET /", () => {
    beforeEach(() => {
      Praise.find = () => ({
        populate: () => ({
          sort: () => ({ lean: () => [praise_1, praise_2] }),
        }),
      });
    });

    it("responds with a list of praises", () =>
      request(app)
        .get("/")
        .expect(200, {
          list: [praise_1, praise_2],
        }));
  });

  describe("POST /", () => {
    beforeEach(() => {
      Praise.create = (f) => ({
        ...f,
        populate: () => {},
      });
    });

    it("responds with a praise", () =>
      request(app)
        .post(`/`)
        .send(praise)
        .set("Accept", "application/json")
        .expect(200, {
          praise: praise,
        }));

    it("throws a 400 error if no sender", () =>
      request(app)
        .post(`/`)
        .send({ ...praise, sender: null })
        .set("Accept", "application/json")
        .expect(400));

    it("throws a 400 error if no receiver", () =>
      request(app)
        .post(`/`)
        .send({ ...praise, receiver: null })
        .set("Accept", "application/json")
        .expect(400));
  });
});
