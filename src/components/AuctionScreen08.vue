
<template>
    <div class="outer">
        <div class="inner">
            <div class="inputtextblock">
                <div class="row">
                    <div class="title">Place your bet</div>
                </div>
                <img src="../assets/images/bodyBet2.gif" height="381px" width="360px">

                <v-popover trigger='manual' open  :disabled='!error_message' placement="top">
                    <div class="rowB">
                        <div class="block">
                            <p class="lastbet" v-if="!loading" v-bind:class="{ 'lastbetmrgn': betStepmn>999 }">$ {{betStepmn}}</p>
                            <p v-if="!loading" class="totalbettitle">bet step</p>
                            <img height="20px" width="20px" v-if="loading"
                                 alt="please wait..." src="../assets/images/button_loading.svg" />
                        </div>
                        <button class="betMinus" :disable="loading || sending" v-on:click="decrementBet">-</button>
                        <button class="betPlus" :disable="loading || sending" v-on:click="incrementBet">+</button>
                    </div>
                    <div class="rowC">
                        <div class="block">
                            <p class="lastPrise" v-show="!loading" v-bind:class="{ 'lastpricemrgn': animatedNumber>999 }">$ {{animatedNumber}}</p>
                            <p v-show="!loading" class="totalPrisetitle">total bet size</p>
                        </div>
                        <button v-on:click="next" :disable="loading || error || sending" class="makeBet">Bet
                            <img height="20px" width="20px" v-if="sending"
                                 alt="please wait..." src="../assets/images/button_loading.svg" />
                        </button>
                    </div>
                    <template slot="popover">
                        <span>{{error_message}}</span>
                    </template>
                </v-popover>

            </div>
        </div>
    </div>
</template>

<script>
    import {TweenLite} from "gsap";
    export default {
        name: "AuctionScreen08",
        beforeMount() {
            this.getBetData();
        },
        data(){
            return {
                price: (this.$store.state.currentPrice + this.$store.state.betStepMin),
                phone: this.$store.state.userPhone,
                betStepmn: null,
                betStepmx: null,
                bet: null,
                tweenNumber: 0,
                error_message: '',
                error: false,
                loading: true,
                sending: false
            }
        },
        methods:{
            next(){
                this.$store.dispatch('setBet', this.bet);
                this.$store.dispatch('setPrice', this.price);
                this.sending = true;
                this.$store
                    .dispatch('startVerification', {
                        phone: this.phone
                    }).then( ()=> this.$parent.toScreen(9))
                    .catch(err => {
                        if (err.message === "Network Error") {
                            this.error_message = "Network Error";
                            this.sending = false;
                            setTimeout(() => this.error_message = '', 30000);
                        } else if (typeof err.response !== 'undefined' &&
                            err.response.data.error !== 0){
                            this.sending = false;
                            this.error_message = "Server error";
                        } else {
                            this.error_message = "Sorry, something went wrong.";
                            this.sending = false;
                            this.error = true;
                            setTimeout(() => this.$parent.toScreen(4), 3000)
                        }
                    });
            },
            incrementBet(){
                if (this.bet < this.betStepmx)
                {
                    this.price += this.betStepmn
                    this.bet += this.betStepmn
                }
            },
            decrementBet(){
                if (this.bet > this.betStepmn)
                {
                    this.price -= this.betStepmn
                    this.bet -= this.betStepmn
                }
            },
            getBetData(){
                this.loading = true;
                Promise.all([
                    this.$store.dispatch('getBetStep'), //Отправляем запрос на шаг ставки
                    this.$store.dispatch('getPrice') //Отправляем запрос на получение цены
                ])
                .then(() => {
                    this.betStepmn = this.$store.state.betStepMin;
                    this.betStepmx = this.$store.state.betStepMax;
                    this.bet = this.betStepmn;
                    this.price = (this.$store.state.currentPrice +
                        this.$store.state.betStepMin)
                    this.loading = false;
                    this.error_message='';
                    this.error=false;
                }).catch(err => {
                    this.error = true;
                    this.loading = true;
                    if (err.message === "Network Error") {
                        this.error_message = "Network Error";
                        setTimeout(() => { //fetch data again in 5 seconds
                            this.error_message = ''
                            this.getBetData();
                            }, 5000);
                    } else if (typeof err.response !== 'undefined' &&
                        err.response.data.error !== 0){
                        this.error_message = "Server error";
                        setTimeout(() => {
                            this.$parent.toScreen(4)
                        }, 3000);
                    } else {
                        this.error_message = "Sorry, something went wrong.";
                        this.error = true;
                        setTimeout(() => this.$parent.toScreen(4), 3000)
                    }

                })
            }
        },
        computed: {
            animatedNumber: function() {
                return this.tweenNumber.toFixed(0);
            }
        },
        watch: {
            price: function(newValue) {
                TweenLite.to(this.$data, 0.5, { tweenNumber: newValue });
            }
        },
        mounted() {
            this.$ga.page('/auction');
        }
    }
</script>

<style scoped>

    .betPlus{
        padding: 0;
        border: none;
        background: none;
        font-family: "Nunito", Helvetica, Arial, sans-serif;
        font-size:22px;
        font-weight: 800;
        color:white;

        width: 90px;
        height: 46px;

        box-shadow: 0px 10px 40px rgba(248, 161, 112, 0.2);
        background-image: linear-gradient(to right, #F8A170 0%, #FFCD61  100%);
        border-radius: 10px;

        align: right;
        margin-right: 0px;
        margin-top:7px;
    }

    .betMinus{
        padding: 0;
        border: none;
        background: none;
        font-family: "Nunito", Helvetica, Arial, sans-serif;
        font-size:22px;
        font-weight: 800;
        color:white;

        width: 90px;
        height: 46px;

        box-shadow: 0px 10px 40px rgba(248, 161, 112, 0.2);
        background-image: linear-gradient(to right, #F8A170 0%, #FFCD61  100%);
        border-radius: 10px;

        align: right;
        margin-right: 4px;
        margin-top:7px;
    }

    .inputtextblock
    {

    }

    .pricingVerification
    {
        margin-left: 50px;
        margin-top:174px;
        display: block;
    }


    .pricingSize{
        margin-left: 111px;
        margin-top:97px;
        display: block;
    }

    .smsInterTitleDone
    {
        font-family: Nunito;
        font-style: normal;
        font-weight: bold;
        font-size: 22px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #393939;
        text-align:center;
        margin-top: 178px;
    }

    .title
    {
        font-family: Nunito;
        font-style: normal;
        font-weight: bold;
        font-size: 28px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #393939;

        text-align:center;
        margin-top: 21px;
        margin-bottom: 12px;

    }

    .totalCost{
        font-family: Nunito;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 130%;
        display: flex;
        align-items: center;
        color: #393939;
        text-align:center;
        margin-top: 97px;

    }
    .smsInputInfo
    {
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;


        text-align: left;
        color: #FD5656;
        margin-top:8px;
    }

    .smsCodeInput{
        background: #DFDEDE;
        opacity: 0.3;
        border-radius: 10px;
        width:338px;
        /*Меньше чем в макете на 10px*/
        height:40px;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        text-align:center;
        margin-top: 10px;
    }

    .row
    {
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .rowB
    {
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 3px;
    }

    .rowC
    {

        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2px;
    }

    .block{

        width: 100px;
        display: inline-block;
        margin-right: 15px;
    }


    .makeBet
    {
        padding: 0;
        border: none;
        background: none;
        font-family: "Nunito", Helvetica, Arial, sans-serif;
        font-size:22px;
        font-weight: 800;
        color:white;

        width: 185px;
        height: 45px;

        box-shadow: 0px 10px 40px rgba(248, 161, 112, 0.2);
        background-image: linear-gradient(to right, #F8A170 0%, #FFCD61  100%);
        border-radius: 10px;

        align: right;
        margin-right: 0px;
        margin-top:8px;
    }

    .lastbet{
        font-family: Nunito;
        font-style: normal;
        font-weight: 600;
        font-size: 13pt;
        line-height: 160%;
        color: #393939;
        margin:0px;
        margin-right: 42px;
        margin-top: -2px;
        margin-left: -12px;
    }
    .lastbetmrgn{
        margin-left: -2px;
    }

    .totalbettitle{
        color: #999999;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 9pt;
        line-height: 160%;
        margin:0px;
        margin-right: 42px;
        margin-top: -8px;
        margin-left: -12px;
    }

    .lastPrise{
        font-family: Nunito;
        font-style: normal;
        font-weight: 600;
        font-size: 14pt;
        line-height: 160%;
        color: #393939;
        margin:0px;
        margin-right: 27px;
        margin-left: -22px;
    }

    .lastpricemrgn{
        margin-left: -10px;
    }

    .totalPrisetitle{

        margin:0px;
        color: #999999;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 160%;

        margin-right: 0px;
        margin-left: -25px;
        margin-top: -6px;
    }

    .inputs {
        display: table-cell;
        vertical-align: middle;
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
