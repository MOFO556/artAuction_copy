import Vue from "vue";
import Vuex from "vuex";
import * as user from "@/store/modules/user.js";
import * as bet from "@/store/modules/bet.js";
import * as notification from "@/store/modules/notification.js";
import * as session from "@/store/modules/session.js";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
      user,
      bet,
      notification,
      session
  }
});
