import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ProgressBar from 'vuejs-progress-bar'

import Load00 from './components/Load00.vue';
import Author01 from './components/Author01.vue';
import Author02 from './components/Author02.vue';
import Intro03 from './components/Intro03.vue';
import StartScreen04 from "./components/StartScreen04";
import NumInter05 from "./components/NumInter05";
import Registration06 from "./components/Registration06";
import Agree07 from "./components/Agree07";
import AuctionScreen08 from "./components/AuctionScreen08";
import SmsInter09 from "./components/SmsInter09";
import SuccessBet10 from "./components/SuccessBet10";
import FinalScreen11 from "./components/FinalScreen11"
import Error12 from "./components/Error12";
import Teaser13 from "./components/Teaser13";

import Vuelidate from "vuelidate/src";
import VTooltip from 'v-tooltip';
import VueAnalytics from 'vue-analytics'

Vue.use(Vuelidate);
Vue.use(VTooltip);
Vue.use(VueAnalytics, {
  id: 'UA-156343958-1'
});


Vue.use(ProgressBar);
Vue.component('Load00',Load00);
Vue.component('Author01',Author01);
Vue.component('Author02',Author02);

Vue.component('Intro03',Intro03);
Vue.component('StartScreen04',StartScreen04);
Vue.component('NumInter05',NumInter05);
Vue.component('Registration06',Registration06);
Vue.component('Agree07',Agree07);
Vue.component('AuctionScreen08',AuctionScreen08);
Vue.component('SmsInter09',SmsInter09);
Vue.component('SuccessBet10',SuccessBet10);
Vue.component('FinalScreen11', FinalScreen11);
Vue.component('Error12', Error12);
Vue.component('Teaser13', Teaser13);


Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

