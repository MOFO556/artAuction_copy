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
                ],

      }


    },
    methods: {
      nextComp: function () {
        this.currentComp+=1;
        // eslint-disable-next-line no-console
        console.log("to component:"+ this.currentComp);
        this.component = this.components[this.currentComp];
      },
      prevComp: function () {
        this.currentComp-=1;
        this.component =this.components[this.currentComp]
      },
      toScreen:function (screenNum) {
        this.currentComp=screenNum;
        this.component = this.components[screenNum]
      },
      register () {
        this.$store
                .dispatch('/user/register', {
                  name: this.name,
                  surname: this.surname,
                  patronymic: this.patronymic,
                  email: this.email,
                  phone: this.name,
                  addedAt: this.addedAt,
                  password: this.password /* должен же быть пароль????*/
                })
                .catch(err => {
                  this.errors = err.response.data.errors
                })
      },
      login () {
        this.$store
                .dispatch('/user/login', {
                  phone: this.phone,
                  password: this.password
                })
                .catch(err => {
                  this.error = err.response.data.error
                })
      },
    }
  }
</script>

<style>
    /*Стили invalid и invalidButton для ошибок при валидации*/
    .invalidButton{

    }
  .invalid
  {
    border-color: #FF0000;
    border-width: 5px;
    border-style: inset;
    -webkit-animation-name: bounce;
    animation-name: bounce;
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
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
  /*First transition*/
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease-out;
  }

  .fade-leave-to {
    opacity: 0;
  }
  /*Second transition*/
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
  /*Third transition*/
  .slide-up-enter {
    transform: translateY(10px);
    opacity: 0;
  }

  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.2s ease;
  }

  .slide-up-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
  .slide-up-move {
    transition: transform .5s ease-out;
  }
</style>