
<template>
    <div class="outer" v-on:loadeddata="countDown">
        <div class="inner">
            <progress-bar
                    style="padding-right: 350px; padding-top: 315px"
                    :options="options"
                    :value="value"
            />

        </div>
    </div>
</template>

<script>
    export default {
        name: "Load",

       beforeMount() {
            this.countDown()
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
                    }
                },
                value: 0,
            }
        },
        methods: {
            countDown() {
                if (this.value<=100) {
                    return setTimeout(() => {
                        ++this.value
                        this.countDown()
                    }, 10)
                }
                this.$parent.nextComp();
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
