import {defineStore} from  'pinia'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,getAuth,updateProfile,updateEmail } from 'firebase/auth'
import {auth} from '../firebaseConfig.js'
import router from '../router.js'
import {useDatabaseStore} from '../stores/database.js'


export const useUserStore = defineStore('userStore',{
   state:() => ({ //Todo estos son mi datos 
    userData: null,
    loadingUser: false
   }),
   getters:{ //Funciones computadas y puede devolver info a otros componentes
   },
   actions:{ //Funciones o metodos para realizar modificaciones dentro del state o almacen
      async registerUser(email,password){
         this.loadingUser = true
         try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            this.userData = {email:user.email, uid:user.uid}
         } catch (error) {
            console.error(error)   
         } finally {
            this.loadingUser = false
         }
      },
      async LoginUser(email,password){
         this.loadingUser = true
         try {
            const {user} = await signInWithEmailAndPassword(auth,email,password)
            this.userData = { email:user.email,uid:user.uid }
         } catch (error) {
            console.error(error)
         } finally {
            this.loadingUser = false
         }
      },
      async Logout(){
         const database = useDatabaseStore()
         try {
            database.$reset()
            await signOut(auth)
            this.userData = null
            router.push('/login')
         } catch (error) {
            console.error(error)
         }
      },
      currentUser(){
         return new Promise((res,rej) => {
            const unsuscribe = onAuthStateChanged(auth, (user) => {
               if(user){
                  this.userData = { email:user.email, uid:user.uid }
               } else {
                  this.userData = null
                  const database = useDatabaseStore()
                  database.$reset()
               }
               res(user)
               unsuscribe();
            },(e) => rej(e))
         })
      },
   }
})

