<template>
    <div class="outer">
        <div class="inner">

            <img src="../assets/images/bodybet.gif" height="444px" width="360px">
            <div class="row">
                <div class="block">
                    <p class="lastbet">$ {{price}}</p>
                    <p class="lastbettitle" >{{pState}}</p>

                </div>
                <button v-on:click="start" class="startAuction" :disabled="!setTime">Bet</button>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StartScreen04",

        data(){
            return {
                price: null,
                remTime: [],
                days: null,
                hours: null,
                minutes: null,
                sec: null,
                polling: null,
                pState: null,
                setTime: false,
            }
        },
        methods:{
            start(){
                this.$parent.toScreen(5);
            },
            time () {
                if (this.days === 0 &&
                    this.minutes === 0 &&
                    this.hours === 0 &&
                    this.sec === 0)
                    this.$parent.toScreen(0)
                else
                    if ((--this.sec) < 0) {
                        this.sec = 59;
                        if ((--this.minutes) < 0) {
                            this.minutes = 59;
                            if ((--this.hours) < 0) {
                                this.hours = 23;
                                if ((--this.days) < 0)
                                    this.days = 0;
                            }
                        }
                }
                this.pState = (this.days > 0 ? this.days + " day" +
                    (this.days === 1 ? ' ' : 's ') : "") +
                    (this.hours < 10 ? '0' + this.hours : this.hours) + ":" +
                    (this.minutes < 10 ? '0' + this.minutes : this.minutes) +
                    ":" + (this.sec < 10 ? '0' + this.sec : this.sec);
            }
        },
        beforeMount() {
            this.price = this.$store.state.currentPrice;
            this.days = this.$store.state.remainTime.days;    // Установка дней из хранилища
            this.hours = this.$store.state.remainTime.hours;// Установка часов из хранилища
            this.minutes = this.$store.state.remainTime.minutes; // Установка минут из хранилища
            this.sec = this.$store.state.remainTime.seconds;
            this.setTime = true
            this.time();
            this.polling = setInterval( this.time, 1000);
        },
        beforeDestroy () {
            clearInterval(this.polling)
        },
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
