import BetService from "@/services/BetService";

export const namespaced = true;

export const state = {
    bets: [],
    bet: {}
};

export const mutations = {
    ADD_BET(state, bet) {
        state.bets.push(bet);
    }
};

export const actions = {
    createBet({ commit, dispatch }, bet) {
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
};

export const getters = {

};