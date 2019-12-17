import BetService from "@/services/BetService";
import axios from 'axios'

export const namespaced = true;

export const state = {
    users: [
        {
            id: 1,
            name: "User",
            surname: "Userov",
            patronymic: "Userovich",
            email: "shallo.goiz@yandex.ru",
            phone: "79192790946",
            addedAt: "12.12.2019"
        },
        {
            id: 2,
            name: "User",
            surname: "Userov",
            patronymic: "Userovich",
            email: "shallo.goiz@yandex.ru",
            phone: "79192790946",
            addedAt: "12.12.2019"
        },
        {
            id: 3,
            name: "Test",
            surname: "Test",
            patronymic: "Test",
            email: "shallo.goiz@yandex.ru",
            phone: "79192790946",
            addedAt: "12.12.2019"
        }
    ],
    user: {}
};

export const mutations = {
    /*SET_USER_DATA (state, userData) {
        state.user = userData
        localStorage.setItem('user', JSON.stringify(userData))
        axios.defaults.headers.common['Authorization'] = `Bearer ${
            userData.token
        }`
    },*/
    ADD_USER(state, bet) {
        state.users.push(bet);
    },
    CLEAR_USER_DATA () {
        localStorage.removeItem('user')
        location.reload()
    }
};

export const actions = {
    /*register ({ commit }, credentials) {
        return axios
            .post('//localhost:3000/users', credentials)
            .then(({ data }) => {
                commit('SET_USER_DATA', data)
            })
    },*/
    register({ commit, dispatch }, userData) {
        return BetService.addUser(userData)
            .then(() => {
                commit("ADD_USER", userData);
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
    login ({ commit }, credentials) {
        return axios
            .post('//localhost:3000/users', credentials)
            .then(({ data }) => {
                commit('SET_USER_DATA', data)
            })
    }
};

export const getters = {
    loggedIn (state) {
        return !!state.user
    },
    getUserPhone: state => {
        return state.users.filter(users => users.phone);
    }
};