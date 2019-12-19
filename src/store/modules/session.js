import BetService from "@/services/BetService";
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
        state.sessions.push(session);
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
    finishSession({ commit, dispatch }, session) {
        return BetService.finishSession(session)
            .then(() => {
                commit("FIN_SESSION", session);
                dispatch("getLockStat", false, { root: true });
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
    },
    isFree({ dispatch }, session) {
        return BetService.checkSession(session)
            .then((res) => {
                dispatch("getLockStat", res.data.locked, { root: true });
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
};