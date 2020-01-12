

<template>
    <div class="outer">
        <div class="inner">
            <div class="element">
                <div class="text">
                    <h2>last name</h2>
                    <h1>ANASTASIA</h1>
                    <h3>shibari artist</h3>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        name: "Author02",
        beforeMount() {
            let click = () => {
                clearTimeout(timer);
                this.$parent.toScreen(3);
                document.body.removeEventListener('click',click);
            };
            let timer = setTimeout(()=>{
                document.body.removeEventListener('click',click);
                this.$parent.toScreen(3)
            },2000);
            document.body.addEventListener('click', click);
        },
        data(){
            return{
                value: 0,
            }
        },
        methods: {

        }
    }
</script>

<style scoped>




    .text{
        /* font-family: AvantGardeGothicCTT;*/
        font-family: AvantGardeGothicC-Demi;
        margin-left:-100px;
        position: absolute;

        left: 49%;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);

        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);

        margin-top: 213px;

        /*



       */
    }

    .element {
        background-image: url("../assets/images/ramka.svg");
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
    }

    h3{
        margin-top: 0;
        text-align: right;

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
        font-size: 40px;
        line-height: 59px;

        color: #000000;
    }


</style>

