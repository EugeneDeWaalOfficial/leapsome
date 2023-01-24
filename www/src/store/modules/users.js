import axios from "axios";

// ID of the current use
//
// Note: change this value if you are pre-populating your MongoDB with other data than the one
// provided with the code
//
const CURRENT_USER_ID = "000000000000000000000001";

const state = {
  currentUser: {},
  list: []
};

const getters = {
  current(state) {
    return state.currentUser;
  },
  list(state) {
    return state.list;
  }
};

const actions = {
  current({ commit }) {
    return axios.get(`/api/users/${CURRENT_USER_ID}`).then(res => {
      const user = res.data.user;

      if (user) {
        commit("updateCurrentUser", user);
      }
    });
  },

  list({ commit }) {
    return axios.get(`/api/users`).then(res => {
      const list = res.data.list;
      if (list) {
        commit("updateList", list);
      }
    });
  }
};

const mutations = {
  updateCurrentUser(state, user) {
    state.currentUser = user;
  },
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
