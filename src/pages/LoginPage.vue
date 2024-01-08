<script lang="ts" setup>
import { ref } from 'vue'
import { useMainStore } from '@/store'
import { logger } from '@/utils/logger'

const mainStore = useMainStore()

const email = ref('qesandbox@gmail.com')
const password = ref('')

async function loginEmailPassword(): Promise<void> {
  try {
    await mainStore.loginEmailPass({ email: email.value, password: password.value })
  } catch (ex) {
    logger.error(ex.message)
  }
}
</script>

<template>
  <div class="app-login">
    <div>email: <input id="email" v-model="email" type="text" label="Email"></div>
    <div>password: <input id="password" v-model="password" type="text" label="Password"></div>

    <div>username is: qesandbox@gmail.com</div>
    <div>password is: test123</div>
    <button id="sign-in-button-manual" type="button" @click="loginEmailPassword">
      login with email and password
    </button>
  </div>
</template>

<style type="scss">
.app-login {
  hr {
    margin: 20px 0 60px;
  }

  button {
    margin: 0 auto;
  }
}
</style>