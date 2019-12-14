<template>
  <div class="home">
    <component :is=component></component>
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
        component:'StartScreen04',
        currentComp:4,
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
        this.component = this.components[this.currentComp]
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
                .dispatch('register', {
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
                .dispatch('login', {
                  email: this.email,
                  password: this.password
                })
                .catch(err => {
                  this.error = err.response.data.error
                })
      },
      createBet () {
        this.$store
                .dispatch('createBet', {
                  addedAt: this.addedAt,
                  phone: this.phone,
                  bet_id:this.bet_id,
                  bet: this.bet,
                  ToPay: this.ToPay
                })
                .catch(err => {
                  this.error = err.response.data.error
                })
      },
    }
  }
</script>
