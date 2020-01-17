<template>
  <div class="home">
    <transition name="slide-fade" mode="out-in">
      <component :is=component></component>
    </transition>
  <!--  <button v-on:click="nextComp">Next</button>
    <button v-on:click="prevComp">Prev</button>-->
  </div>
</template>
<script>
  // @ is an alias to /src

  export default {
    name: "home",
    data(){
      return{
        component:'Load00',
        currentComp:0,
        components:
                [
                  'Load00',
                  'Author01',
                  'Author02',
                  'Intro03',
                  'StartScreen04',
                  'NumInter05',
                  'Registration06',
                  'Agree07',
                  'AuctionScreen08',
                  'SmsInter09',
                  'SuccessBet10',
                  'FinalScreen11',
                  'Error12',
                  'Teaser13'
                ],
      }
      },
    methods: {
      toScreen:function (screenNum) {
        this.currentComp=screenNum;
        this.component = this.components[screenNum]
      },
      clearSession() {
        // eslint-disable-next-line no-console
        console.log("closing session");
        if (this.$store.state.userPhone)
          this.$store
            .dispatch('session/finishSession', {
              phone: this.$store.state.userPhone
            })
            .catch(err => {
              this.error = err.response.data.error
            })
      }
    },
    beforeCreate() {
      let myEvent = window.attachEvent || window.addEventListener;
      let checkEvent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compitable

      myEvent(checkEvent, ()=> { // For >=IE7, Chrome, Firefox
       this.clearSession();
       return undefined;
      });
      //window.unload = this.clearSession;
      this.$ga.page('/');
    }
  }
</script>

<style>
    /*Стили invalid и invalidButton для ошибок при валидации*/
    .invalidButton{

    }
  .invalid
  {
    animation: fieldErrorAnimation 3s;
    animation-fill-mode: forwards;
  }
  .modal {
    width: 250px;
    height: 200px;
    padding: 10px;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 2%;
    background-color: #e0e0e0;
  }

  /*Transition*/
  .slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.2s ease;
  }

  .slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }

  @keyframes fieldErrorAnimation {
  0%   {
  left: 0px;}
  5%  {
  left: -10px;}
  10%  {
  left: 10px;}
  15% {
  left: 0px;}
  100% {
  box-shadow: 0px 5px 5px red;}
}
.tooltip {
  display: block !important;
  z-index: 10000;
}
 


.tooltip .tooltip-inner {
  background-image: linear-gradient(to right, #F8A170 0%, #FFCD61 100%);
  max-width: 200px !important;
  white-space: pre-wrap;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
  animation: ease-in ;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: #F8A170/*linear-gradient(to right, #F8A170 0%, #FFCD61 100%);*/
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -4px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
</style>
