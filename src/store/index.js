import Vue from "vue";
import Vuex from "vuex";
import BetService from "@/services/BetService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bets: [],
    bet: {}
  },
  mutations: {
    ADD_BET(state, bet) {
      state.bets.push(bet);
    },
  },
  actions: {
    createEvent({ commit, dispatch }, bet) {
      return BetService.postBet(bet)
          .then(() => {
            commit("ADD_BET", bet);
            const notification = {
              type: "success",
              message: "Your bet been successfully created"
            };
            dispatch("notification/add", notification, { root: true });
          })
          .catch(error => {
            const notification = {
              type: "error",
              message:
                  "There was a mistake while placing a bet: " + error.message
            };
            dispatch("notification/add", notification, { root: true });
            throw error;
          });
    }
  },
  modules: {}
});
