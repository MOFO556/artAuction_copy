<template>
    <div class="outer">
        <div class="inner">
            <div class="row">
                <div class="block">
                    <h2>Sorry something went wrong</h2>
                    <p>{{error}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FinalScreen11",
        data(){
            return {
                theWinnerName: this.$store.state.theWinnerName,
                theWinnerSurname: this.$store.state.theWinnerSurname,
                error: "Error"

            }
        },
        beforeMount (){
            this.$store.dispatch('notification/pop')
                .then(result => this.error =  result.message);
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