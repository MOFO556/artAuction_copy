
<template>
    <div class="outer">
        <div class="inner">
            <div class="inputtextblock">
                <div class="row">
                    <div class="title">Verification</div>
                </div>
                <div class="row">

                    <div class="smsInterTitleDone">Enter sms verification code</div>
                    <img class="pricingVerification" src="../assets/images/Pricing.svg" height="19.4px" width="19.4px">
                </div>

                <div class="row">
                    <v-popover trigger='click' open :disabled='!verification_field_error' >
                        <input class="smsCodeInput" :style="verification_field_error ? field_error_animation : ''"
                               v-on:keyup.enter="createBet" :disabled="verification_active"
                               type="text" placeholder="code" v-model="code">
                        <template slot="popover">
                            <span>Введён неверный код</span>
                        </template>
                    </v-popover>
                </div>

                <div class="row">
                    <div class="totalCost">${{price}} USD</div>
                    <img class="pricingSize" src="../assets/images/Pricing.svg" height="19.4px" width="19.4px">
                </div>
                <v-popover placement="top" trigger='click' open :disabled='error_message==""' >
                    <button v-on:click="createBet" :disabled="verification_active" class="completeBet">Complete
                        <img height="20px" width="20px" v-show="verification_active"
                             alt="please wait..." src="../assets/images/button_loading.svg" /></button>
                    <template slot="popover">
                        <span>{{error_message}}</span>
                    </template>
                </v-popover>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SmsInter09",
        beforeCreate() {
            this.price=this.$store.state.currentPrice //Устанавливаем текущую цену
            this.phone=this.$store.state.userPhone      //Устанавливаем номер телефона
        },
        beforeDestroy(){
            clearInterval(this.polling)
            this.$parent.clearSession();
        },
        data(){
          return{
              price: this.$store.state.currentPrice,
              phone: this.$store.state.userPhone,
              code: null,
              polling: null,
              verification_active: false,
              field_error_animation:{animation: 'fieldErrorAnimation 3s', animationFillMode: "forwards"},
              verification_field_error: false,
              error_message: ''
          }
        },
        methods:{
            createBet () {
                if (this.code){
                    this.verification_active = true;
                    this.verification_field_error = false;
                    this.$store
                        .dispatch('verify', {
                            phone: this.phone,
                            token: this.code,
                        }).then(() => {
                            if (this.$store.state.verificationStatus)
                            {
                                this.verification_active = false;
                                this.$store
                                    .dispatch('bet/createBet', {
                                        phone: this.phone,
                                        bet: this.$store.state.bet.bet
                                    }).then( ()=>
                                    this.$parent.toScreen(10))
                                    .catch(err => {
                                        this.verification_active = false;
                                        switch (err.response.data.error){
                                            case 1:
                                                this.error_message='You are not allowed to bet for now';
                                                setTimeout( ()=> this.$parent.toScreen(4),5000);
                                                break;
                                            case 2:
                                                this.error_message='Your session has expiered';
                                                setTimeout( ()=> this.$parent.toScreen(4),5000);
                                                break;
                                            case 4:
                                                this.error_message='You cant bet two times in a row';
                                                setTimeout( ()=> this.$parent.toScreen(4),5000);
                                        }
                                        this.error = err.response.data.error
                                    })
                            }
                        }).catch(err => {
                            this.verification_active = false;
                            this.verification_field_error = true;
                            if (typeof err.response !== 'undefined'
                                && err.response.data.error) {
                                this.error = err.response.data.error;
                                if (err.response.data.error == 1) {
                                    this.$store.dispatch('notification/add', {
                                        message: "SMS verification went wrong"
                                    });
                                    this.$parent.toScreen(12);
                                }
                            }
                        });
                }
            },
            /*verify(){
                this.$store
                    .dispatch('verify', {
                        phone: this.phone,
                        token: this.code,
                    })
                    .catch(err => {
                        if (typeof err.response !== 'undefined'
                            && err.response.data.error) {
                            this.error = err.response.data.error
                            if (err.response.data.error == 1)

                                this.$parent.toScreen(4);
                        }
                    })
            },*/
            abortSession(){
                this.polling = setInterval(() => {
                    this.$store
                        .dispatch('session/finishSession', {
                            phone: this.phone
                        })
                        .catch(err => {
                            this.error = err.response.data.error
                        })
                    this.$parent.toScreen(4);
                }, 300000)
            }
        },
        mounted() {
            window.onbeforeunload= ()=> this.$parent.clearSession();
            window.onunload= ()=> this.$parent.clearSession();
            this.abortSession();
        }
    }
</script>

<style scoped>

    .inputtextblock
    {

    }

    .pricingVerification
    {
        margin-left: 43px;
        margin-top:165px;
        display: block;
    }


    .pricingSize{
        margin-left: 140px;
        margin-top:165px;
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
        margin-top: 165px;
        margin-left: 0px;
        letter-spacing: -0.02em;
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

        margin-top: 22px;
    }

    .totalCost{
        font-family: Nunito;
        font-style: normal;
        font-weight: bold;
        font-size: 28px;
        line-height: 130%;
        display: flex;
        align-items: center;
        color: #393939;
        text-align:center;
        margin-top: 165px;

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
        -webkit-box-shadow:none;
        -moz-box-shadow:none;
        box-shadow: none;
        background: #DFDEDE;
        opacity: 0.3;
        border-radius: 2px;
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
				position: relative;

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
        font-size:24px;
        font-weight: 800;
        color:white;
        width: 338px;
        height: 45px;
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
