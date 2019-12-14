import axios from 'axios'

export const namespaced = true;

export const state = {
    user: /*null*/ {
        name: "TEST",
        surname:"TEST",
        patronymic:"TEST",
        email:"shallo.goiz@yandex.ru",
        phone:"79192790946",
        addedAt:"12.12.2019"
    }
};

export const mutations = {
    SET_USER_DATA (state, userData) {
        state.user = userData
        localStorage.setItem('user', JSON.stringify(userData))
        axios.defaults.headers.common['Authorization'] = `Bearer ${
            userData.token
        }`
    },
    CLEAR_USER_DATA () {
        localStorage.removeItem('user')
        location.reload()
    }
};

export const actions = {
    register ({ commit }, credentials) {
        return axios
            .post('//localhost:3000/users', credentials)
            .then(({ data }) => {
                commit('SET_USER_DATA', data)
            })
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
    }
};