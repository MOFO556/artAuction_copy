<template>
    <div class="outer">
        <div class="inner">
                <img src="../assets/images/body.gif" height="580px" width="360">
        </div>
    </div>
</template>

<script>
    import loadImage from 'image-promise';
    export default {
        name: "Intro03",
        beforeMount() {
            this.time = new Date();
            let delay = () => {
                let  elapse = 5500 - (Math.floor(Date.now()-this.time.getTime()));
                if (elapse>0)
                    setTimeout(()=>this.$parent.toScreen(4),elapse);
                else
                    this.$parent.toScreen(4)
            };
            loadImage('../assets/images/bodybet.gif')
                .then( delay )
                .catch( delay ) //some browsers throw if image loaded in cache
                                //and we better proceed any way even with no images
        },
        data(){
            return{
                value: 0,
                time : null
            }
        },
        methods: {

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

