import Vue from "vue";
import Vuex from "vuex";
import BetService from "@/services/BetService";
import * as user from "@/store/modules/user.js";
import * as bet from "@/store/modules/bet.js";
import * as notification from "@/store/modules/notification.js";
import * as session from "@/store/modules/session.js";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      answerPhone: null,
      answerLock: null,
      currentPrice: null,
      verificationData: [],
      isSMSsent: null,
      userPhone: null,
      betStepMin: null,
      betStepMax: null,
      remainTime: [],
      verificationStatus: false,
      theWinnerName: null,
      theWinnerSurname: null,
  },
  mutations: {
    PHONE_STAT(state, answer){
        state.answerPhone = answer
    },
      LOCK_STAT(state, answer){
          state.answerLock = answer
      },
      CHANGE_PRICE(state, price){
          state.currentPrice = price
      },
      SET_VERIFICATION_DATA(state, code){
          state.verificationData.push(code);
      },
      SET_SMS_STAT(state, answer){
          state.isSMSsent = answer;
      },
      ADD_USER_PHONE(state, number){
        state.userPhone = number
      },
      SET_BET_STEPMIN(state, betStep){
        state.betStepMin = betStep
      },
      SET_BET_STEPMAX(state, betStep){
          state.betStepMax = betStep
      },
      SET_REMAIN_TIME(state, time){
        state.remainTime.push(time);
    },
      SET_VERIFICATION_STATUS(state, status){
        state.verificationStatus = status
      },
      SET_BET(state, bet){
        state.bet.bet = bet
      },
      SET_WINNER_NAME(state, theWinnerName){
        state.theWinnerName = theWinnerName;
      },
      SET_WINNER_SURNAME(state, theWinnerSurname){
          state.theWinnerSurname = theWinnerSurname
      },
  },
  actions: {
      getPhoneStat({ commit }, ans) {
          commit("PHONE_STAT", ans);
      },
      getLockStat({ commit }, ans) {
          commit("LOCK_STAT", ans);
      },
      setPrice({ commit }, sum) {
          commit("CHANGE_PRICE", sum);
      },
      getPrice({ commit, dispatch }){
          return BetService.getPrice()
              .then((res) => {
                  commit("CHANGE_PRICE", res.data.sum);
                  const notification = {
                      type: "success",
                      message: "Prices have been successfully loaded"
                  };
                  dispatch("notification/add", notification, { root: true });
              })
              .catch(error => {
                  const notification = {
                      type: "error",
                      message:
                          "There was a mistake while loading the price: " + error.message
                  };
                  dispatch("notification/add", notification, { root: true });
                  throw error;
              });
      },
      getBetStep({ commit, dispatch }){
          return BetService.getBetStep()
              .then((res) => {
                  commit("SET_BET_STEPMIN", res.data.min);
                  commit("SET_BET_STEPMAX", res.data.max);
                  const notification = {
                      type: "success",
                      message: "Bet steps have been successfully loaded"
                  };
                  dispatch("notification/add", notification, { root: true });
              })
              .catch(error => {
                  const notification = {
                      type: "error",
                      message:
                          "There was a mistake while loading bet steps: " + error.message
                  };
                  dispatch("notification/add", notification, { root: true });
                  throw error;
              });
      },
      startVerification({ commit }, phone){
          return BetService.verificationStart(phone)
              .then((res) => {
                  commit("SET_SMS_STAT", res.data.isSent);
              })
      },
     verify({ commit, dispatch }, code){
          return BetService.completeVerification(code)
              .then((res) => {
                  commit("SET_VERIFICATION_DATA", code);
                  commit("SET_VERIFICATION_STATUS", res.data.success)
                  const notification = {
                      type: "success",
                      message: "Your telephone have been successfully verified"
                  };
                  dispatch("notification/add", notification, { root: true });
              })
              .catch(error => {
                  const notification = {
                      type: "error",
                      message:
                          "There was a mistake while versifying your telephone: " + error.message
                  };
                  dispatch("notification/add", notification, { root: true });
                  throw error;
              });
      },
      setUserPhone({ commit }, number) {
          commit("ADD_USER_PHONE", number);
      },
      getRemainTime({commit}){
          return BetService.getRemainedTime()
              .then((res) => {
                  commit("SET_REMAIN_TIME", res.data);
              })
              .catch(err => {
                  // eslint-disable-next-line no-console
                  if(typeof err.response !== 'undefined'
                      && err.response.data.error === 1
                  ){
                      commit('SET_WINNER_NAME', err.response.data.name)
                      commit('SET_WINNER_SURNAME', err.response.data.surname)
                  }
                  throw err;
              })
      },
      setBet({commit}, bet){
          commit("SET_BET", bet)
      },
      setWinner({commit}){
          return BetService.getTheWinner()
              .then((res) => {
                  commit("SET_WINNER", res.data);
              })
      }
  },
  modules: {
      user,
      bet,
      notification,
      session
  },
    getters:{

    }
});
