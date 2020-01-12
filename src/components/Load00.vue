<template>
    <div class="outer" v-on:loadeddata="countDown">
        <div class="inner">
            <div class="font_preload" style="opacity: 0">
                <span style="font-family: AvantGardeGothicC-Demi"></span>
            </div>
            <progress-bar
                    style="padding-right: 350px; padding-top: 315px"
                    :options="options"
                    :value="value"
            />

        </div>
    </div>
</template>

<script>
    import loadImage from 'image-promise';
    export default {
        name: "Load",
        beforeDestroy(){
            this.$store.dispatch('getRemainTime') //Отправляем запрос на оставшееся время
                .catch(err => {
                    if(err.response.data.error === 1){
                        this.$parent.toScreen(11);
                    }
                })
        },
       beforeMount() {
            this.countDown()
           //preload images
           try {
               loadImage('../assets/images/ramka.svg')
                   .then( ()=>this.load_flags.ramka = 1)
                   // eslint-disable-next-line no-console
                   .catch(() => this.load_flags.ramka = 1)

               let img2 = new Image();
               img2.onload = () => this.load_flags.button_loading = 1;
               img2.src = '../assets/images/button_loading.svg';
               let img3 = new Image();
               img3.src = '../assets/images/body.gif';
               img3.onload = () => this.load_flags.body = 1;
               let img4 = new Image();
               img4.onload = () => this.load_flags.bodybet = 1
               let img5 = new Image();
               img5.src = '../assets/images/urlPricing.svg';

           } catch (e) {
               // eslint-disable-next-line no-console
                console.log(e);
               this.load_flags.body = 1
               this.load_flags.ramka = 1;
               this.load_flags.button_loading = 1;
               this.load_flags.bodybet = 1
           }
        },
        data(){
            return{
                options: {
                    text: {
                        color: '#FFFFFF',
                        shadowEnable: true,
                        shadowColor: '#000000',
                        fontSize: 0,
                        fontFamily: 'Helvetica',
                        dynamicPosition: false,
                        hideText: false
                    },
                    progress: {
                        color: '#F8A170',
                        backgroundColor: '#A3A3A3'
                    },
                    layout: {
                        height: 10,
                        width: 349,
                        verticalTextAlign: 61,
                        horizontalTextAlign: 43,
                        zeroOffset: 0,
                        strokeWidth: 30,
                        progressPadding: 0,
                        type: 'line'
                    },
                },
                load_flags:{
                    ramka: 0,
                    button_loading: 0,
                    body: 0,
                    bodybet: 0
                },
                value: 0,
            }
        },
        methods: {
            countDown() {
                if (this.value<=100) {
                    return setTimeout(() => {
                        if (this.value<80)
                            ++this.value
                        else {
                                this.value+=.1;
                                if (this.load_flags.ramka)
                                ++this.value;
                        }
                        this.countDown()
                    }, 10)
                }
                this.$parent.toScreen(1);
            }
        },
    }
</script>

<style scoped>
    .inner{
        background: white;
        width: 360px;
        height: 580px;
    }

    .outer
    {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
</style>
