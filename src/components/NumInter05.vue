<template>
    <div class="outer">
        <div class="inner">
            <img src="../assets/images/body.png" height="444px" width="360px">
            <div class="inputtextblock">
                <div class="row">
                    <div :class="{busyStyle : busyFlag}" class="smsInterTitle">{{message}}</div>
                    <img class="pricing" src="../assets/images/Pricing.svg" height="19.4px" width="19.4px">
                </div>
                <div class="row">
									<v-popover trigger='click' open :disabled='error_message==""' >

                    <input  type="text" v-model="phone"
                           :class="{ invalid: $v.phone.$error }"
                           @blur="$v.phone.$touch()"
                           class="phoneInput"
							:style="verification_field_error ? field_error_animation : ''"
							:disabled="verification_active"
                    >
                                        <template slot="popover">
												<span>
													{{error_message}}
												</span>
                                        </template>
                                    </v-popover>

                    <button v-on:click="next"
                            :disabled="$v.$anyError || verification_active"
                            :class="{ invalidButton: $v.$anyError }"
                            class="startAuction block"
                    >GO <img height="20px" width="20px" v-show="verification_active"
                            alt="please wait..." src="../assets/images/button_loading.svg" />
                    </button><!--ЗАПОЛНИТЬ СТИЛЬ invalidButton в Home.vue-->


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
              busyFlag:false,
							error_message: '',
							field_error_animation:{animation: 'fieldErrorAnimation 3s', animationFillMode: "forwards"},
							verification_field_error: false,
							verification_active: false
          }
        },
        methods:{
            next(){
                if (!this.$v.$invalid){
										this.error_message = '';
										this.verification_field_error = false;
										this.verification_active = true;
                    this.$store
                        .dispatch('session/isFree', { //Запрос состояния сессии
                            phone: this.phone
                        }).then(()=>{
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
                          })
                        .catch(err => {
                            this.errors = err.response.data.error
														switch (err.response.data.error){
															case 1:
																this.error_message = "Sorry, somebody is already placing a bet.\n Try again in a few minutes.";
																this.verification_active = false;
																setTimeout( ()=> this.error_message='',30000);
																break;
															case 2:
																this.error_message = "Incorrect phone number. Make sure you are \nentering it in international formate.";
																this.verification_field_error = true;
																this.verification_active = false;
																break;
														}


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
            position: relative;
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
<style>
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
      border-radius : 8px;
    border: solid red;}
}
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
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
