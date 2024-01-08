<script lang="ts" setup>
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { onMounted } from 'vue'
import LoginPage from '@/pages/LoginPage.vue'
import { useMainStore } from '@/store'

const mainStore = useMainStore()

onMounted(() => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  }

  const firebaseApp = initializeApp(firebaseConfig)
  mainStore.firebase = firebaseApp
  const auth = getAuth(firebaseApp)

  onAuthStateChanged(auth, (oauth) => {
    mainStore.currentUser = oauth
    mainStore.globalLoading = false
  })

  setTimeout(() => {
    mainStore.globalLoading = false
  }, 5000)
})
</script>

<template>
  <div class="app-parent">
    <div id="modal-target" />
    <header>
      <div><img class="app-parent--logo" src="@/assets/logo.png"> Prestige Financial Solutions</div>
    </header>

    <div id="sign-in-area" />

    <main v-if="mainStore.globalLoading" class="spinner">
      <img src="@/assets/puff.svg">
    </main>

    <main v-else class="column">
      <div v-if="mainStore.currentUser">
        currently logged in user: {{ mainStore.currentUser.email }}
      </div>
      <router-view v-if="mainStore.currentUser" />
      <LoginPage v-else />
    </main>

    <footer class="grow">
      <div class="center">
        &copy; Allocate Next Ventures
      </div>
      <div class="links" />
    </footer>
  </div>
</template>

<style type="scss">
@import url(sanitize.css);

body {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: "Roboto", sans-serif;
  padding: 0;
  margin: 0;
  min-height: 100%;
  max-height: 100%;
}

.spinner {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  img {
    height: 100px;
  }
}

.app-parent--logo {
  height: 40px;
  margin-right: 10px;
}


.app-parent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-grow: 1;
  width: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
  text-align: left;
  color: #2c3e50;
  min-height: 100vh;
  width: 100%;
  display: flex;
  z-index: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-grow: 1;

  input {
    background: #ffffff;
    border-radius: 15px;
    padding: 11px 25px;
    width: 100%;
    border: 1;
    max-width: 300px;
  }

  main {
    padding: 0;
    min-height: 100%;
    width: 100%;
    flex-grow: 1;
  }

  #modal-target {
    z-index: 100;
  }

  header {
    display: flex;
    align-self: flex-start;
    color: #07a4ff;
    font-size: 48px;
    background-color: #202a37;
    width: 100%;
    padding: 0 80px;
    min-width: 100%;

    em {
      color: white;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 23px;
    }
  }

  footer {
    padding: 10px 10%;
    text-align: center;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 100%;
    border-top: 2px solid #eee;
    width: 100%;

    .center {
      flex-grow: 1;
    }

    div:nth-of-type(2) {
      opacity: 0.5;
    }

    .links {
      justify-self: flex-end;
    }
  }

  .success {
    color: #01cea2;
  }

  button {
    background: #304552;
    border: 1px solid #497383;
    box-sizing: border-box;
    color: white;
    font-size: 14px;
    padding: 7px 10px;
    min-width: 150px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 40px;

    &:hover {
      border: 1px solid white;
    }

    img {
      margin-right: 10px;
    }
  }
}
</style>
