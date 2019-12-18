<template>
    <div>
        <h1>Intro 3</h1>

    </div>


</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>




<template>
    <div class="outer">
        <div class="inner">
                <img src="../assets/images/body.gif" height="640px" width="360">
        </div>
    </div>


</template>

<script>
    export default {
        name: "Intro03",
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
                if (this.value<=100) {
                    return setTimeout(() => {
                        ++this.value
                        this.countDown()
                    }, 100)
                }
                this.$parent.nextComp();
            }
        }
    }
</script>

<style scoped>



    .text{
        /* font-family: AvantGardeGothicCTT;*/
        font-family: AvantGardeGothicCTT;
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
    }

    .element {
        background-image: url("../assets/images/ramka.png");
        width:292px;
        height:423px;

        margin-left: 34px;
        margin-top: 114px;



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
        font-size: 48px;
        line-height: 59px;

        color: #000000;
    }


</style>

