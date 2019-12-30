<template>
    <div class="outer">
        <div class="inner">

            <img src="../assets/images/bodybet.gif" height="444px" width="360px">
            <div class="row">
                <div class="block">
                    <p class="lastbet">$ {{price}}</p>
                    <p class="lastbettitle">{{pState}}</p>

                </div>
                <button v-on:click="start" class="startAuction" :disabled="!setTime">Bet</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StartScreen04",
        beforeCreate(){
            this.$store
                .dispatch('getPrice') //Отправляем запрос на получение цены
                .then(()=>{
                    this.price = this.$store.state.currentPrice
                })
                .catch(err => {
                    this.errors = err.response.data.errors
                })
            this.$store
                .dispatch('getRemainTime') //Отправляем запрос на оставшееся время
                .then(()=>{
                    this.days = this.$store.state.remainTime[0].days    // Установка дней из хранилища
                    this.hours = this.$store.state.remainTime[0].hours// Установка часов из хранилища
                    this.minutes = this.$store.state.remainTime[0].minutes // Установка минут из хранилища
                    this.setTime = true
                })
                .catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err.response.data.error)
                    if(err.response.data.error == 1){
                        this.pState = "Auction time is up"
                        this.setTime = false
                    }
                    this.errors = err.response.data.errors
                })

        },
        data(){
            return {
                price: null,
                remTime: [],
                days: null,
                hours: null,
                minutes: null,
                sec: 0,
                polling: null,
                pState: null,
                setTime: null,
            }
        },
        methods:{
            start(){
                this.$parent.nextComp();
            },
            getCountdown(){
               if (this.sec<60 && !(this.days<0)) {
                   return setTimeout(() => {
                       ++this.sec
                       this.getCountdown()
                   }, 1000)
               }
               this.sec=0;
               this.minutes-=1;
                if (this.minutes< 0)
                {
                    this.minutes=60
                    this.hours-=1
                }
                if (this.hours< 0)
                {
                    this.hours=24
                    this.days-=1
                }
                if (this.days<0){
                    this.days=0
                   /* this.$parent.nextComp();*/
                }
                this.getCountdown()
            },
            pollData () {
                if (this.setTime){
                    this.polling = setInterval(() => {
                        if(this.hours<10 && this.minutes<10){
                            this.pState= "remain : "+this.days+" - 0"+this.hours+":0"+this.minutes
                        }
                        if(this.hours<10 && this.minutes>=10){
                            this.pState= "remain : "+this.days+" - 0"+this.hours+":"+this.minutes
                        }
                        if(this.hours>=10 && this.minutes<10){
                            this.pState= "remain : "+this.days+" - "+this.hours+":0"+this.minutes
                        }
                        if(this.hours>=10 && this.minutes>=10){
                            this.pState= "remain : "+this.days+" - "+this.hours+":"+this.minutes
                        }
                    }, 100)
                }
            }
        },
        beforeMount() {
            this.getCountdown();
        },
        created() {
            this.pollData();
        },
        beforeDestroy () {
            clearInterval(this.polling)
        }
    }
</script>

<style scoped>


    .row
    {
        margin-top: 34px;
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .block{
        width: 120px;
        display: inline-block;
        margin-right: 9px;
    }


    .startAuction
    {
        padding: 0;
        border: none;
        background: none;
        font-family: "Nunito", Helvetica, Arial, sans-serif;
        font-size:22px;
        color:white;
        width: 185px;
        height: 60px;
        box-shadow: 0px 10px 40px rgba(248, 161, 112, 0.2);
        background-image: linear-gradient(to right, #F8A170 0%, #FFCD61  100%);
        border-radius: 10px;
        margin-right: 15px;
        margin-bottom: 5px;
    }

    .lastbet{

        font-family: Nunito;
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 160%;
        color: #393939;
        margin:0px;
        letter-spacing: -0.02em;
        margin-left: -20px;
        margin-top: 4px;
    }

    .lastbettitle{

        margin-top: -6px;
        color: #999999;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 160%;
        margin-left:10px;

    }






</style>
