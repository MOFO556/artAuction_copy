
<template>
    <div class="outer">
        <div class="inner">
            <progress-bar
                    style="padding-right: 350px; padding-top: 315px"
                    :options="options"
                    :value="value"
            />
            <radial-progress-bar
            :diameter="200"
            :completed-steps="completedSteps"
            :total-steps="totalSteps"
            startColor="#F8A170"
            stopColor="#FFCD61"
            />
        </div>
    </div>
</template>

<script>
    import RadialProgressBar from 'vue-radial-progress'
    export default {
        name: "Load",
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
                        color: '#11111111',
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
                value: 33,
                completedSteps: 10,
                totalSteps: 30,
            }
        },
        components:{
            RadialProgressBar
        },

    }
</script>

<style scoped>



</style>
