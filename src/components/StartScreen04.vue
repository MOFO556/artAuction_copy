<template>
    <div class="outer">
        <div class="inner">

            <img src="../assets/images/body.png" height="464px" width="360px">
            <div class="row">
                <div class="block">
                    <p class="lastbet">$ {{price}}</p>
                    <p class="lastbettitle">last bet size</p>
                </div>
                <button v-on:click="start" class="startAuction block">Bet</button>
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
        },
        data(){
            return {
                price: null
            }
        },
        methods:{
            start(){
                this.$parent.nextComp();
            },

        }
    }
</script>

<style scoped>


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
        font-size:22px;
        color:white;
        width: 185px;
        height: 60px;
        box-shadow: 0px 10px 40px rgba(248, 161, 112, 0.2);
        background-image: linear-gradient(to right, #F8A170 0%, #FFCD61  100%);
        border-radius: 10px;
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
