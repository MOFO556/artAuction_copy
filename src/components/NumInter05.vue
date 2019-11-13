<template>
    <div class="outer">
        <div class="inner">

            <img src="../assets/images/body.png" height="464px" width="360px">
            <div class="inputtextblock">
                <div class="row">
                    <div class="smsInterTitle">Inter your phone number</div>
                    <img class="pricing" src="../assets/images/Pricing.svg" height="19.4px" width="19.4px">
                </div>
                <div class="row">
                    <input class="phoneInput" type="text">
                    <button class="startAuction block">GO</button>
                </div>
                <div class="phoneInputInfo" >Inter your phone number</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NumInter05"
    }
</script>

<style scoped>

    .inputtextblock
    {
        margin-left: 24px;
    }

    .pricing
    {
        margin-left: 50px;
        margin-top:3px;
        display: block;
    }

    .smsInterTitle
    {
        font-family: Nunito;
        font-style: normal;
        font-weight: bold;
        font-size: 22px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #393939;
        margin-bottom:10px;
    }

    .phoneInputInfo
    {
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        display: flex;
        align-items: center;
        color: #FD5656;
        margin-top:14px;
    }


    .phoneInput{
        background: #DFDEDE;
        opacity: 0.3;
        border-radius: 10px;
        width:205px;
        height:40px;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        text-align:center;
    }



    .row
    {
        width: 100%;
      /*  text-align: center;*/
        display: flex;
      /*  align-items: center;
        justify-content: center;*/
    }

    .block{

        width: 100px;
        display: inline-block;
        margin-right: 43px;
    }


    .startAuction
    {
        padding: 0;
        border: none;
        background: none;
        font-family: "Nunito", Helvetica, Arial, sans-serif;
        font-size:22px;
        font-weight: 600;
        color:white;
        width: 97px;
        height: 44px;
        box-shadow: 0px 10px 40px rgba(248, 161, 112, 0.2);
        background-image: linear-gradient(to right, #F8A170 0%, #FFCD61  100%);
        border-radius: 10px;
        margin-left: 15px;
        align: right;
        margin-right: 0px;
    }

    .lastbet{
        font-family: Nunito;
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 160%;
        color: #393939;
        margin:0px;



    }

    .lastbettitle{

        margin:0px;
        color: #999999;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 160%;
    }






</style>
