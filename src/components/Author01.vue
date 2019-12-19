

<template>
    <div class="outer">
        <div class="inner">
            <div class="element">
                <div class="text">
                    <h2>nasybullova</h2>
                    <h1>MAYANA</h1>
                    <h3>sculptor</h3>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        name: "Author01",
        beforeMount() {
            this.countDown()
        },
        data(){
            return{
                value: 0,
            }
        },
        methods: {
            countDown() {
                /*if (this.value<=100) {
                    return setTimeout(() => {
                        ++this.value
                        this.countDown()
                    }, 10)
                }
                this.$parent.nextComp();*/
            }
        }
    }
</script>

<style scoped>



    .text{
        /* font-family: AvantGardeGothicCTT;*/
        font-family: AvantGardeGothicC-Demi;
        margin-left:-100px;
        position: absolute;

        left: 50%;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);

        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        margin-bottom: 5px;
    }

    .element {
        background-image: url("../assets/images/ramka.png");
        width:292px;
        height:423px;

        margin-left: 34px;
        margin-top: 78px;



    }


    h2{
        text-align: left;

        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;

        color: #000000;
        margin-bottom: 0;
        margin-top: -3px;
    }

    h3{
        margin-top: 0;
        text-align: right;
        margin-bottom: -10px;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;

        color: #000000;

    }

    h1{
        margin: 0;

        font-style: normal;
        font-weight: bold;
        font-size: 48px;
        line-height: 59px;

        color: #000000;
        margin-bottom: -9px;
    }


</style>

