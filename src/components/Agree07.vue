
<template>
    <div class="outer">
        <div class="inner">


            <div class="inputtextblock">
                <div class="row">
                    <div class="smsInterTitle">User Agreement</div>
                </div>
                <div >
                    <textarea class="agreementText" type="text" readonly>
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ex elit, imperdiet at dapibus vel, consequat eu erat. Cras odio ipsum, malesuada vel est nec, cursus scelerisque mi. Nunc quam elit, iaculis sit amet facilisis et, auctor et tellus. Nunc a felis vitae nulla egestas varius. Praesent quis tortor consectetur est laoreet finibus. Praesent suscipit, augue sit amet eleifend maximus, dolor nibh blandit nunc, vel tincidunt quam massa sit amet velit. In sem diam, vulputate in purus a, dictum posuere felis. Quisque vehicula commodo magna vel
                    </textarea>

                </div>
                <v-popover trigger='click' open :autoHide="false" :disabled='(!error_message)' placement="top">
                    <button v-on:click="next" :disabled="error || sending" class="startAuction block">Agree
                        <img height="20px" width="20px" v-show="sending"
                             alt="please wait..." src="../assets/images/button_loading.svg" />
                    </button>
                    <button v-on:click="denied" class="startAuction block  rightDisagree">Disagree</button>
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
        name: "Agree07",
        data(){
          return {
              error_message: '',
              error: false,
              sending: false
          }
        },
        methods:{
            next(){
                if (!this.sending) {
                    this.sending = true;
                    this.$store
                        .dispatch('user/register')//Отправляем данные пользователя на сервер
                        .then(() => this.$parent.toScreen(8))
                        .catch(err => {
                            if (err.message === "Network Error") {
                                this.error_message = "Network Error";
                                this.sending = false;
                                setTimeout(() => this.error_message = '', 30000);
                            } else if (typeof err.response !== 'undefined' &&
                                err.response.data.error !== 0) {
                                this.error_message = "User data is incorrect.";
                                setTimeout(() => {
                                    this.$parent.toScreen(6)
                                }, 3000);
                            } else {
                                this.error_message = "Sorry, something went wrong.";
                                this.error = true;
                                setTimeout(() => this.$parent.toScreen(4), 3000)
                            }
                        })
                }
            },
            denied(){
                this.$parent.toScreen(4);
            },
        },
        mounted() {
            window.onbeforeunload= ()=> this.$parent.clearSession();
            window.onunload= ()=> this.$parent.clearSession();
        }
    }
</script>

<style scoped>

    .inputtextblock
    {

    }

    .pricing
    {
        margin-left: 50px;
        margin-top:3px;
        display: block;
    }

    .smsInterTitle
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
        margin-bottom: 37px;
        margin-top: 22px;
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


    .agreementText{
        -webkit-box-shadow:none;
        -moz-box-shadow:none;
        border:none;
        box-shadow: none;
        resize: none;
        background: #DFDEDE;
        opacity: 0.3;
        border-radius: 10px;
        width:324px;
        height:317px;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        text-align:left;

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


    .startAuction
    {
        padding: 0;
        border: none;
        background: none;
        font-family: "Nunito", Helvetica, Arial, sans-serif;
        font-size:24px;
        font-weight: 800;
        color:white;
        width: 158px;
        height: 70px;
        box-shadow: 0px 10px 40px rgba(248, 161, 112, 0.2);
        background-image: linear-gradient(to right, #F8A170 0%, #FFCD61  100%);
        border-radius: 10px;
        align: right;
        margin-right: 0px;
        margin-top:69px;
    }

    .rightDisagree{
        margin-left:10px;
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
