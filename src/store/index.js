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
      remainTime: []
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
    }
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
              .then(() => {
                  commit("SET_VERIFICATION_DATA", code);
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
