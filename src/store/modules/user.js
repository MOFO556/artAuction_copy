import BetService from "@/services/BetService";
export const namespaced = true;

export const state = {
    users: [],
    user: {}
};

export const mutations = {
    ADD_USER(state, user) {
        state.users.push(user);
        state.user = user
    }
};

export const actions = {
    register({ dispatch }) {
        return BetService.addUser(state.user)
            .then((res) => {
                dispatch("setPrice", res.data.sum, { root: true });
                const notification = {
                    type: "success",
                    message: "User have been successfully created"
                };
                dispatch("notification/add", notification, { root: true });
            })
            .catch(error => {
                const notification = {
                    type: "error",
                    message:
                        "There was a mistake while creating a user: " + error.message
                };
                dispatch("notification/add", notification, { root: true });
                throw error;
            });
    },
    addUser({ commit }, userData) {
                commit("ADD_USER", userData);
    },
    login ({ commit, dispatch }, userPhone) {
        return BetService.checkPhone(userPhone)
            .then((res) => {
                commit("ADD_USER", userPhone);
                dispatch("getPhoneStat", res.data.exists, { root: true });
                dispatch("setPrice", res.data.sum, { root: true });
                const notification = {
                    type: "success",
                    message: "You have been successfully checked phone"
                };
                dispatch("notification/add", notification, { root: true });
            })
            .catch(error => {
                const notification = {
                    type: "error",
                    message:
                        "There was a mistake while checking the phone: " + error.message
                };
                dispatch("notification/add", notification, { root: true });
                throw error;
            });
    }
};
