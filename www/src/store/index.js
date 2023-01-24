import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

import praise from "@/store/modules/praise";
import users from "@/store/modules/users";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  namespaced: true,
  modules: {
    praise,
    users
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
