import axios from "axios";

const state = {
  list: []
};

const getters = {
  list(state) {
    return state.list;
  }
};

const actions = {
  list({ commit }) {
    return axios.get(`/api/praise`).then(res => {
      const list = res.data.list;
      if (list) {
        commit("updateList", list);
      }
    });
  },

  create({ dispatch }, { praise }) {
    return axios.post(`/api/praise`, { ...praise }).then(() => {
      return dispatch("list");
    });
  }
};

const mutations = {
  updateList(state, list) {
    state.list = list;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
