<template>
    <div class="outer">
        <div class="inner">
            <div class="row">
                <div class="block">
                    <h3>You've successfully placed a bet</h3>
                    <p>Your bet amount is: ${{price}} USD</p>
                </div>
            </div>
            <button v-on:click="fin" class="finAuction">ОК</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SuccessBet10",
        data(){
            return {
                polling: null,
                price: this.$store.state.currentPrice
            }
        },
        methods:{
            fin(){
                this.$parent.toScreen(4);
            },
            forcedLeft(){
                this.polling = setInterval(() => {
                this.$parent.toScreen(4);
            }, 30000)
        }
        },
        mounted() {
            this.$ga.page('/successfulBet');
            this.forcedLeft();
        },
        beforeDestroy() {
            clearInterval(this.polling)
        }
    }
</script>

<style scoped>

    .row
    {
        margin-top: 194px;
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .block{
        width: 350px;
        display: inline-block;
        margin-right: 9px;
    }
    .finAuction
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
</style>