<template>
    <div class="outer">
        <div class="inner">
            <img src="../assets/images/body.png" height="444px" width="360px">
            <div class="inputtextblock">
                <div class="row">
                    <div class="smsInterTitle" :class="{busyStyle : busyFlag}">{{message}}</div>
                    <img class="pricing" src="../assets/images/Pricing.svg" height="19.4px" width="19.4px">
                </div>
                <div class="row">
                    <input class="phoneInput" type="text" v-model="phone"
                           :class="{ invalid: $v.phone.$error }"
                           @blur="$v.phone.$touch()"
                    >
                    <button v-on:click="next" class="startAuction block" :disabled="$v.$anyError"
                            :class="{ invalidButton: $v.$anyError }"
                    >GO</button><!--ЗАПОЛНИТЬ СТИЛЬ invalidButton в Home.vue-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {required, minLength, maxLength} from "vuelidate/lib/validators";
    const telephone = (value) => {
            return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value);
    };

    export default {
        name: "NumInter05",
        validations: {
            phone: {
                required,
                minLength: minLength(11),
                maxLength: maxLength(12),
                telephone
            }
        },
        data(){
          return{
              phone:null,
              changeClass:null,
              polling:null,
              message: "Inter your phone number",
              busyFlag:false
          }
        },
        methods:{
            next(){
                if (!this.$v.$invalid){
                    this.$store
                        .dispatch('session/isFree', { //Запрос состояния сессии
                            phone: this.phone
                        }).then(()=>{
                            if (!this.$store.state.answerLock) //Если свободна, то проверяем телефон
                                {
                                    this.$store
                                        .dispatch('user/login', { //Запрос на наличие в базе телефона
                                            phone: this.phone
                                        }).then(()=>{
                                            if (this.$store.state.answerPhone) //Если есть, то идём делать ставку
                                                {
                                                    this.$parent.toScreen(8);
                                                }
                                            else //Если нет, то идём регистрироваться
                                            {
                                                this.$parent.nextComp();
                                            }
                                        })
                                        .catch(err => {
                                            this.error = err.response.data.error
                                        })
                                }
                            else //Если сессия занята, то подменяем надпись
                            {
                                this.busyFlag=true;
                                this.message="Sorry, somebody placing a bet"
                                this.polling = setInterval(() => {
                                    this.busyFlag = false;
                                    this.message = "Inter your phone number"
                                }, 20000)
                            }
                          })
                        .catch(err => {
                            this.errors = err.response.data.errors
                        })
                    this.$store.dispatch('setUserPhone', this.phone)
                }
            },
        },
        beforeDestroy () {
            clearInterval(this.polling)//

            this.$store
                .dispatch('session/addSession', { // Добавили сессию покинув экран
                    phone: this.phone,
                    bet: this.price
                })
                .catch(err => {
                    this.error = err.response.data.error
                })
            this.$store
                .dispatch('setPrice', this.price)
                .catch(err => {
                    this.error = err.response.data.error
                })
        }
    }
</script>

<style scoped>
    .busyStyle{
        color: red;
    }
    .inputtextblock
    {
        margin-left: 24px;
    }

    .pricing
    {
        margin-left: 56px;
        margin-top: 17px;
        display: block;
    }

    .smsInterTitle
    {
        font-family: Nunito;
        font-style: normal;
        font-weight: bold;
        font-size: 22px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #393939;
        margin-bottom:10px;
        margin-top:11px;
        letter-spacing: -0.024em;
        margin-left:-1px;
    }

    .phoneInputInfo
    {
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        display: flex;
        align-items: center;
        color: #FD5656;
        margin-top:14px;
    }


    .phoneInput{
        -webkit-box-shadow:none;
        -moz-box-shadow:none;
        border:none;
        box-shadow: none;
        background: #DFDEDE;
        opacity: 0.3;
        border-radius: 10px;
        width:195px;
        height:40px;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        text-align:center;
    }



    .row
    {
        width: 100%;
      /*  text-align: center;*/
        display: flex;
      /*  align-items: center;
        justify-content: center;*/
    }

    .block{

        width: 100px;
        display: inline-block;
        margin-right: 43px;
    }


    .startAuction
    {
        padding: 0;
        border: none;
        background: none;
        font-family: "Nunito", Helvetica, Arial, sans-serif;
        font-size:22px;
        font-weight: 600;
        color:white;
        width: 97px;
        height: 44px;
        box-shadow: 0px 10px 40px rgba(248, 161, 112, 0.2);
        background-image: linear-gradient(to right, #F8A170 0%, #FFCD61  100%);
        border-radius: 10px;
        margin-left: 15px;
        align: right;
        margin-right: 0px;
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
</style>
