import {FirebaseApp} from "firebase/app";
import {getAuth, signInWithEmailAndPassword, signOut, User} from "firebase/auth";
import {defineStore} from "pinia";

type LoginCredentials = {
  email: string;
  password: string;
}

export const useMainStore = defineStore('main', {
  state: ()=> ({
    isDevelopment: process.env.NODE_ENV !== "production",
    currentUser: null as User | null,
    globalLoading: true,
    firebase: null as FirebaseApp | null,
  }),
  actions: {
    async loginEmailPass(val : LoginCredentials){
      if(!this.firebase){
        return;
      }
      
      const auth = getAuth(this.firebase);
      let userCredential = await signInWithEmailAndPassword(auth, val.email, val.password);
      this.currentUser = userCredential.user;
    },
    async logout(){
      if(!this.firebase){
        return;
      }

      const auth = getAuth(this.firebase);
      await signOut(auth);
      this.currentUser = null;
    }
  }
})
