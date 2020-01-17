<template>
    <div class="outer">
        <div class="inner">
            <div class="inputtextblock">
                <div class="row">
                    <div class="smsInterTitle">Registration</div>
                </div>
                <div >
                    <input class="phoneInput" type="text" placeholder="First Name"
                               v-model="FirstName"
                               :class="{ invalid: $v.FirstName.$error }"
                               @blur="$v.FirstName.$touch()"
                               v-on:keyup.enter="register">
                </div>

                <div>
                    <input class="phoneInput" type="text" placeholder="Last Name"
                               v-model="SecondName"
                               :class="{ invalid: $v.SecondName.$error }"
                               @blur="$v.SecondName.$touch()"
                               v-on:keyup.enter="register">
                </div>

                <div>
                    <input class="phoneInput" type="email" placeholder="Email Address"
                               v-model="Email"
                               :class="{ invalid: $v.Email.$error }"
                               @blur="$v.Email.$touch()"
                               v-on:keyup.enter="register">
                </div>

                <div>
                    <input class="phoneInput" type="text" placeholder="Country"
                               v-model="Country"
                               :class="{ invalid: $v.Country.$error }"
                               @blur="$v.Country.$touch()"
                               v-on:keyup.enter="register">
                </div>

                <div>
                    <input class="phoneInput" type="text" placeholder="Mobile number"
                           v-model="Phone" disabled="true">
                </div>

                <v-popover trigger='manual' open :autoHide="false" :disabled='(!$v.$anyError || !error_message)' placement="top">
                    <button v-on:click="register" :disabled="$v.$anyError" class="startAuction block"
                            :class="{ invalidButton: $v.$anyError }"
                    >Go to Agreement</button> <!--ЗАПОЛНИТЬ СТИЛЬ invalidButton в Home.vue-->

                    <template slot="popover">
                        <span>{{error_message}}</span>
                    </template>
                </v-popover>
            </div>
        </div>
    </div>
</template>

<script>
    import {required} from "vuelidate/lib/validators";
    import {validateString, validateEmail} from '../services/validationService';
    export default {
        name: "Registration06",
        validations: {
            FirstName: {required, correct: validateString},
            SecondName: {required, correct: validateString},
            Email: {required, correct: validateEmail},
            Country: {required, correct: validateString},
            Phone: {required},
        },
        data(){
            return{
                FirstName: null,
                SecondName: null,
                Email: null,
                Country: null,
                Phone: this.$store.state.userPhone,
                error_message_fn: '',
                error_message_sn: '',
                error_message_em: '',
                error_message_co: '',
                field_error_animation:{animation: 'fieldErrorAnimation 3s', animationFillMode: "forwards"},
            }
        },
        methods:{
            register () {
                if (!this.$v.$invalid) {
                    this.$store
                        .dispatch('user/addUser', { //Отправляем заполненные данные в хранилище
                            name: this.FirstName,
                            surname: this.SecondName,
                            email: this.Email,
                            country: this.Country,
                            phone: this.Phone
                        })
                    this.$parent.toScreen(7)
                }
            }
        },
        computed:{
            error_message () {
                let name = this.$v.FirstName;
                let secondName = this.$v.SecondName;
                let country = this.$v.Country;
                let email = this.$v.Email;
                let string_incorect = ''
                if ((!name.required && name.$dirty) ||
                    (!secondName.required && secondName.$dirty)||
                    (!country.required && country.$dirty)||
                    (!email.required  && email.$dirty))
                    string_incorect += "Please fill marked fields. "
                if (!name.correct ||
                    !secondName.correct ||
                    !country.correct)
                    string_incorect += 'Fields should not contain numbers and punctuation marks. ';
                if (!email.correct && email.required)
                    string_incorect += 'You should enter a correct email.'
                return string_incorect;
            }
        },
        mounted() {
            this.$ga.page('/registration');
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

        font-style: normal;
        font-weight: bold;
        font-size: 28px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #393939;

        text-align:center;
        margin-bottom: 39px;
        margin-top: 23px;
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
        -webkit-box-shadow:none;
        -moz-box-shadow:none;
        box-shadow: none;
        background: #DFDEDE;
        opacity: 0.3;
        border-radius: 10px;
        width:327px;
        height:50px;
        font-family: Nunito;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        text-align:center;
        margin-bottom: 16px;
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
        width: 327px;
        height: 70px;
        box-shadow: 0px 10px 40px rgba(248, 161, 112, 0.2);
        background-image: linear-gradient(to right, #F8A170 0%, #FFCD61  100%);
        border-radius: 10px;

        align: right;
        margin-right: 0px;
        margin-top:46px;
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
