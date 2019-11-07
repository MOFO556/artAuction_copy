<template>
  <div class="home">
    <component :is=component></component>
    <button v-on:click="nextComp">Next</button>
    <button v-on:click="prevComp">Prev</button>
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
        this.component = this.components[this.currentComp]
      },
      prevComp: function () {
        this.currentComp-=1;
        this.component =this.components[this.currentComp]
      }
    }
  }
</script>
