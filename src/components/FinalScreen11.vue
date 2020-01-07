<template>
    <div class="outer">
        <div class="inner">
            <div class="row">
                <div class="block">
                    <h2>Thank you for your attention</h2>
                    <h3>Auction is over</h3>
                    <p>The winner is: {{theWinnerName}} {{theWinnerSurname}}</p>
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
                theWinnerSurname: this.$store.state.theWinnerSurname
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