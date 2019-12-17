import BetService from "@/services/BetService";
/*import axios from 'axios'*/

export const namespaced = true;

export const state = {
    sessions: [],
    session: {}
};

export const mutations = {
    ADD_SESSION(state, session) {
        state.sessions.push(session);
    },
    FIN_SESSION(state, session) {
        state.sessions.unshift(session);
    },
    SWITCH(state) {
        state.session.expired = true
    }
};

export const actions = {
    addSession({ commit, dispatch }, session) {
        return BetService.startSession(session)
            .then(() => {
                commit("ADD_SESSION", session);
                const notification = {
                    type: "success",
                    message: "Your session have been successfully created"
                };
                dispatch("notification/add", notification, { root: true });
            })
            .catch(error => {
                const notification = {
                    type: "error",
                    message:
                        "There was a mistake while creating a session: " + error.message
                };
                dispatch("notification/add", notification, { root: true });
                throw error;
            });
    },
    addInSession({ commit, dispatch }, session) {
        return BetService.finishSession(session)
            .then(() => {
                commit("FIN_SESSION", session);
                const notification = {
                    type: "success",
                    message: "Your session have been successfully finished"
                };
                dispatch("notification/add", notification, { root: true });
            })
            .catch(error => {
                const notification = {
                    type: "error",
                    message:
                        "There was a mistake while finishing a session: " + error.message
                };
                dispatch("notification/add", notification, { root: true });
                throw error;
            });
    },
    switch({ commit }) {
        commit("SWITCH");
    }
};

export const getters = {
    getSessionState: state => {
        return state.sessions.filter(sessions => sessions.expired === false);
    }
};