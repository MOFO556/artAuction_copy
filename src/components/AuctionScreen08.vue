
<template>
    <div class="outer">
        <div class="inner">


            <div class="inputtextblock">

                <div class="row">
                    <div class="title">Make Bet</div>
                </div>

                <img src="../assets/images/bodyBet.png" height="410px" width="360px">

                <div class="row">
                    <div class="block">
                        <p class="lastbet">$ {{betStepmn}}</p>
                        <p class="totalbettitle">bet step</p>
                    </div>
                    <button class="betMinus" v-on:click="decrementBet">-</button>
                    <button class="betPlus" v-on:click="incrementBet">+</button>
                </div>
                <div class="row">
                    <div class="block">
                        <p class="lastbet">$ {{price}}</p>
                        <p class="totalbettitle">total bet size</p>
                    </div>
                    <button v-on:click="next" class="makeBet">Bet</button>
                </div>



            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AuctionScreen08",
        beforeCreate() {
            this.$store
                .dispatch('getPrice') //Отправляем запрос на получение цены
                .then(() => {
                    this.price = this.$store.state.currentPrice
                })
                .catch(err => {
                    this.errors = err.response.data.errors
                })
            this.$store
                .dispatch('getBetStep')
                .then(() => {
                    this.betStepmn = this.$store.state.betStepMin,
                    this.betStepmx = this.$store.state.betStepMax,
                    this.bet = this.betStepmn
                })
                .catch(err => {
                    this.errors = err.response.data.errors
                })
        },
        data(){
            return {
                price: this.$store.state.currentPrice,
                phone: this.$store.state.userPhone,
                betStepmn: null,
                betStepmx: null,
                bet: null
            }
        },
        methods:{
            next(){
                this.$store //Запрос, свободна ли сессия
                    .dispatch('session/isFree', {
                        phone: this.phone
                    }).then(()=>{ //Проверяем ответ
                        if (!this.$store.state.answerLock){ //Если свободна, то добавляем новую и едём вперед
                            this.$store
                                .dispatch('session/addSession', {
                                    phone: this.phone,
                                    bet: this.price
                                })
                                .catch(err => {
                                    this.error = err.response.data.error
                                })
                            this.$parent.nextComp();
                        }
                        else { //Если занята, то выводим сообщение
                            const notification = {
                                type: "error",
                                message: "Session is busy"
                            };
                            this.$store
                                .dispatch("notification/add", notification);
                        }
                })
                .catch(err => {
                    this.error = err.response.data.error
                })
            },
            incrementBet(){
                if (this.bet <= this.betStepmx)
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
            }
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
        margin-top:0px;
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
        margin-top:0px;
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
        margin-top:0px;
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

    .totalbettitle{

        margin:0px;
        color: #999999;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 160%;
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

    .totalbettitle{

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
