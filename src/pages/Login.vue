<template>
    <div class="app-login">
        <div>email: <input id="email" type="text" label="Email" v-model="email" /></div>
        <div>password: <input id="password" type="text" label="Password" v-model="password" /></div>

        <div>username is: qesandbox@gmail.com</div>
        <div>password is: test123</div>
        <button id="sign-in-button-manual" @click="loginEmailPassword">login with email and password</button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useMainStore } from "../store"

const mainStore = useMainStore();

const email = ref("qesandbox@gmail.com");
const password = ref("");

async function loginEmailPassword() {
    try {
        await mainStore.loginEmailPass({ email: email.value, password: password.value });
    } catch (ex) {
        alert(ex.message);
    }
}
</script>

<style lang="scss">
.app-login {
    hr {
        margin: 20px 0 60px;
    }

    button {
        margin: 0 auto;
    }
}
</style>