const request = require("supertest");
const { Praise, Users } = require("../models");
const express = require("express");

const app = express();

const router = require("./users");

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

const stats = { sent: 2, received: 3 };

describe("api/users", () => {
  describe("GET /", () => {
    beforeEach(() => {
      Users.find = () => ({ sort: () => ({ lean: () => [user_1, user_2] }) });
    });

    it("responds with a list of users", () =>
      request(app)
        .get("/")
        .expect(200, {
          list: [user_1, user_2],
        }));
  });

  describe("GET /:id", () => {
    beforeEach(() => {
      Users.findById = (id) => ({
        lean: () => [user_1, user_2].find((user) => user._id === id),
      });

      Praise.aggregate = () => [stats];
    });

    it("responds with a user and their stats", () =>
      request(app)
        .get(`/${user_1._id}`)
        .expect(200, {
          user: { ...user_1, stats },
        }));

    it("responds with a 404 error if user not found", () =>
      request(app).get(`/000000000000000000000012`).expect(404));
  });
});
