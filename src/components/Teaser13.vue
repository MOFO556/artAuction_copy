<template>
    <div class="outer">
        <div class="inner">
            <div class="row">
                <div class="block">
                    <h2>Please stand by</h2>
                    <h3>Auction starts in</h3>
                    <p>{{pState}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Teaser13",
        data(){
            return {
                days: null,
                hours: null,
                minutes: null,
                sec: null,
                pState: '',
                polling: null
            }
        },
        beforeMount() {
            this.days = this.$store.state.remainTime.days;    // Установка дней из хранилища
            this.hours = this.$store.state.remainTime.hours; // Установка часов из хранилища
            this.minutes = this.$store.state.remainTime.minutes; // Установка минут из хранилища
            this.sec = this.$store.state.remainTime.seconds;
            this.time();
            this.polling = setInterval( this.time, 1000);
        },
        beforeDestroy(){
          clearInterval(this.polling)
        },
        methods: {
            time () {
                if (this.days === 0 &&
                    this.minutes === 0 &&
                    this.hours === 0 &&
                    this.sec === 0)
                    this.$parent.toScreen(0)
                else
                    if ((--this.sec) < 0) {
                        this.sec = 59;
                        if ((--this.minutes) < 0) {
                            this.minutes = 59;
                            if ((--this.hours) < 0) {
                                this.hours = 23;
                                if ((--this.days) < 0)
                                    this.days = 0;
                            }
                        }
                    }
                    this.pState = (this.days > 0 ? this.days + " day" +
                        (this.days === 1 ? ' ' : 's ') : "") +
                        (this.hours < 10 ? '0' + this.hours : this.hours) + ":" +
                        (this.minutes < 10 ? '0' + this.minutes : this.minutes) +
                        ":" + (this.sec < 10 ? '0' + this.sec : this.sec);
            }
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
</style>