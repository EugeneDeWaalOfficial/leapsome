import axios from "axios";

import users from "@/store/modules/users";

jest.mock("axios");

describe("store/users", () => {
  it("is namespaced", () => {
    expect(users.namespaced).toEqual(true);
  });

  describe("state", () => {
    const { state } = users;

    it("has a `currentUser` field which is an Object", () => {
      const expected = {};
      const actual = state.currentUser;

      expect(actual).toEqual(expected);
    });

    it("has a `list` field which is an Array", () => {
      const expected = true;
      const actual = Array.isArray(state.list);

      expect(actual).toEqual(expected);
    });
  });

  describe("getters", () => {
    const { getters } = users;

    it("has a `current` getter that retrieves the state's currentUser", () => {
      const currentUser = { _id: "1", firstname: "Billie", lastname: "Some" };
      const state = { currentUser };

      const actual = getters.current(state);

      expect(actual).toEqual(currentUser);
    });

    it("has a `list` getter that retrieves the state's list", () => {
      const list = [1, 2, 3];
      const state = { list };

      const actual = getters.list(state);

      expect(actual).toEqual(list);
    });
  });

  describe("actions", () => {
    const { actions } = users;

    it("fetches the current user", async () => {
      const user = { _id: "1", firstname: "A", lastname: "B", stats: {} };
      const res = { data: { user } };
      axios.get.mockResolvedValue(res);

      const commit = jest.fn();

      await actions.current({ commit });

      expect(commit).toHaveBeenCalled();
      expect(commit.mock.calls[0][0]).toEqual("updateCurrentUser");
      expect(commit.mock.calls[0][1]).toEqual(user);
    });

    it("fetches the list of users", async () => {
      const list = [{ _id: "1", firstname: "A", lastname: "B", stats: {} }];
      const res = { data: { list } };
      axios.get.mockResolvedValue(res);

      const commit = jest.fn();

      await actions.list({ commit });

      expect(commit).toHaveBeenCalled();
      expect(commit.mock.calls[0][0]).toEqual("updateList");
      expect(Array.isArray(commit.mock.calls[0][1])).toBe(true);
    });
  });

  describe("mutations", () => {
    const { mutations } = users;

    it("updates the current user", () => {
      const state = {
        currentUser: { _id: "1" }
      };

      mutations.updateCurrentUser(state, { _id: "2" });

      expect(state).toEqual({
        currentUser: { _id: "2" }
      });
    });

    it("updates the list", () => {
      const state = {
        list: [3, 2, 1]
      };

      mutations.updateList(state, [1, 2, 3]);

      expect(state).toEqual({
        list: [1, 2, 3]
      });
    });
  });
});
