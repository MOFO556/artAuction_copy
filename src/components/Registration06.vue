

<template>
    <div class="outer">
        <div class="inner">


            <div class="inputtextblock">
                <div class="row">
                    <div class="smsInterTitle">Registration</div>
                </div>
                <div >
                    <input class="phoneInput" type="text" placeholder="First Name">
                </div>
                <div>
                    <input class="phoneInput" type="text" placeholder="Last Name">
                </div>

                <div>
                    <input class="phoneInput" type="text" placeholder="Email Address">
                </div>

                <div>
                    <input class="phoneInput" type="text" placeholder="Country">
                </div>
                <div>
                    <input class="phoneInput" type="text" placeholder="Mobile number">
                </div>


                <button v-on:click="register" class="startAuction block">Go to Agreement</button>
                <div class="phoneInputInfo row" >Inter valid data</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Registration06",
        methods:{
            next(){
                this.$parent.nextComp();
            },
            register () {
                this.$store
                    .dispatch('user/register', {
                        id: 3,
                        name: "Test",
                        surname: "Test",
                        patronymic: "Test",
                        email: "shallo.goiz@yandex.ru",
                        phone: "79192790946",
                        addedAt: "12.12.2019",
                        /*name: this.name,
                        surname: this.surname,
                        patronymic: this.patronymic,
                        email: this.email,
                        phone: this.name,
                        addedAt: this.addedAt,
                        password: this.password *//* должен же быть пароль????*/
                    })
                    .catch(err => {
                        this.errors = err.response.data.errors
                    })
                this.$parent.nextComp();
            },

        }

    }
</script>

<style scoped>

    .inputtextblock
    {

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
        font-size: 28px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #393939;
        margin-bottom:10px;
        text-align:center;
        margin-bottom: 34px;
        margin-top: 40px;
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
        width:338px;
        height:40px;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        text-align:center;
        margin-bottom: 18px;
    }



    .row
    {
        width: 100%;
         text-align: center;
        display: flex;
         align-items: center;
         justify-content: center;
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
        font-size:28px;
        font-weight: 800;
        color:white;
        width: 338px;
        height: 70px;
        box-shadow: 0px 10px 40px rgba(248, 161, 112, 0.2);
        background-image: linear-gradient(to right, #F8A170 0%, #FFCD61  100%);
        border-radius: 10px;

        align: right;
        margin-right: 0px;
        margin-top:80px;
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


    .inputs {
        display: table-cell;
        vertical-align: middle;
    }
</style>
