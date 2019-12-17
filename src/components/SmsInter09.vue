
<template>
    <div class="outer">
        <div class="inner">


            <div class="inputtextblock">

                <div class="row">
                    <div class="title">Verification</div>
                </div>

                <div class="row">

                    <div class="smsInterTitleDone">Inter sms verification code</div>
                    <img class="pricingVerification" src="../assets/images/Pricing.svg" height="19.4px" width="19.4px">
                </div>

                <div class="row">
                    <input class="smsCodeInput" type="text" placeholder="code" v-on:focusout="verify">
                </div>

                <div class="row">
                    <div class="smsInputInfo" >Inter valid data</div>
                </div>

                    <div class="row">
                        <div class="totalCost">${{price}} USD</div>
                        <img class="pricingSize" src="../assets/images/Pricing.svg" height="19.4px" width="19.4px">
                    </div>
                <button v-on:click="createBet" class="completeBet">Complete</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SmsInter09",
        beforeCreate() {
            this.$store
                .dispatch('startVerification', {
                    phone: "7999999999"
                    //phone: this.phone
                })
                .catch(err => {
                    this.errors = err.response.data.errors
                })
        },
        beforeDestroy(){
            this.$store
                .dispatch('session/finishSession', {
                    phone: "7999999999"
                    //phone: this.phone
                })
                .catch(err => {
                    this.error = err.response.data.error
                })
        },
        data(){
          return{
              price: this.$store.state.currentPrice //Устанавливаем текущую цену
          }
        },
        methods:{
            createBet () {
                this.$store
                    .dispatch('bet/createBet', {
                        phone: "79192790946",
                        bet:5550/*
                            phone: this.phone,
                            bet: this.bet,*/
                    })
                    .catch(err => {
                        this.error = err.response.data.error
                    })
                this.$parent.toScreen(4);
            },
            verify(){
                this.$store
                    .dispatch('verify', {
                        phone: "79192790946",
                        token:"5550"/*
                        phone: this.phone,
                        bet: this.bet,*/
                    })
                    .catch(err => {
                        this.error = err.response.data.error
                    })
            }
        }
    }
</script>

<style scoped>

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

        margin-top: 40px;
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

    .block{

        width: 100px;
        display: inline-block;
        margin-right: 43px;
    }


    .completeBet
    {
        padding: 0;
        border: none;
        background: none;
        font-family: "Nunito", Helvetica, Arial, sans-serif;
        font-size:28px;
        font-weight: 800;
        color:white;
        width: 338px;
        height: 70px;
        box-shadow: 0px 10px 40px rgba(248, 161, 112, 0.2);
        background-image: linear-gradient(to right, #F8A170 0%, #FFCD61  100%);
        border-radius: 10px;

        align: right;
        margin-right: 0px;
        margin-top:15px;
    }

    .lastbet{
        font-family: Nunito;
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 160%;
        color: #393939;
        margin:0px;



    }

    .lastbettitle{

        margin:0px;
        color: #999999;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 160%;
    }


    .inputs {
        display: table-cell;
        vertical-align: middle;
    }
</style>
