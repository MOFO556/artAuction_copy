

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
    import loadImage from 'image-promise';
    export default {
        name: "Author01",
        beforeMount() {
            //this.countDown()
            this.time = new Date();
            let delay = () => {
                let  elapse = 2000 - (Math.floor(Date.now()-this.time.getTime()));
                if (elapse>0)
                    setTimeout(()=>this.$parent.toScreen(2),elapse);
                else
                    this.$parent.toScreen(2);
            };
            loadImage('../assets/images/body.gif')
                .then( delay )
                .catch( delay ) //some browsers throw if image loaded in cache
                                //and we better proceed any way even with no images
        },
        data(){
            return{
                time: null,
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

       left: 50%;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);

        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);

        margin-top: 202px;

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
        margin-top: -3px;
    }

    h3{

        text-align: right;

        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;

        color: #000000;

        margin-top: 0;
        margin-bottom: -10px;
    }

    h1{


        font-style: normal;
        font-weight: bold;
        font-size: 48px;
        line-height: 59px;

        color: #000000;

        margin: 0;
        margin-bottom: -9px;
    }


</style>

