import axios from "axios";

import praise from "@/store/modules/praise";

jest.mock("axios");

describe("store/praise", () => {
  it("is namespaced", () => {
    expect(praise.namespaced).toEqual(true);
  });

  describe("state", () => {
    const { state } = praise;

    it("has a `list` field which is an Array", () => {
      const expected = true;
      const actual = Array.isArray(state.list);

      expect(actual).toEqual(expected);
    });
  });

  describe("getters", () => {
    const { getters } = praise;

    it("has a `list` getter that retrieves the state's list", () => {
      const list = [1, 2, 3];
      const state = { list };

      const actual = getters.list(state);

      expect(actual).toEqual(list);
    });
  });

  describe("actions", () => {
    const { actions } = praise;

    it("fetches the list of praises", async () => {
      const list = [{ _id: "1", sender: "A", receiver: "B", content: "C" }];
      const res = { data: { list } };
      axios.get.mockResolvedValue(res);

      const commit = jest.fn();

      await actions.list({ commit });

      expect(commit).toHaveBeenCalled();
      expect(commit.mock.calls[0][0]).toEqual("updateList");
      expect(Array.isArray(commit.mock.calls[0][1])).toBe(true);
    });

    it("creates a new praise", async () => {
      const praise = { _id: "1", sender: "A", receiver: "B", content: "C" };
      const res = { data: { praise } };
      axios.post.mockResolvedValue(res);

      const dispatch = jest.fn();

      await actions.create({ dispatch }, { praise });

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("mutations", () => {
    const { mutations } = praise;

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
