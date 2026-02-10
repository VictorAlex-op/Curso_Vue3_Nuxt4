import { addDoc, collection, getDocs, getDoc , deleteDoc, updateDoc, doc, query,where } from 'firebase/firestore/lite'
import {defineStore} from 'pinia'
import {db} from '../firebaseConfig'
import {auth} from '../firebaseConfig'
import { nanoid } from 'nanoid'

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents:[],
        loadingDoc:false
    }),
    actions:{
        async getUrls(){
            if(this.documents.length !== 0){
                return
            }
            this.loadingDoc = true
            try {
                const q = query(collection(db,'urls'), where('user','==',auth.currentUser.uid))
                const queryShapshot = await getDocs(q)
                queryShapshot.forEach(doc => {
                    console.log(doc.id, doc.data())
                    this.documents.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            } catch (error) {
                console.error(error)
            } finally {
                this.loadingDoc = false
            }
        },
        async addUrl(name) {
            try {
                const doc = { name:name, short:nanoid(6), user:auth.currentUser.uid}
                const docRef = await addDoc(collection(db, 'urls'), {

                })
            } catch (error) {
                console.error(error)
            }
        },
        async deleteUrl(id) {
            this.loadingDoc = true
            try {
                await deleteDoc(doc(db, 'urls', id))
                this.documents = this.documents.filter(item => item.id !== id)
                console.log(dele)
            } catch (error) {
                console.log(error.message)
            } finally {
                this.loadingDoc = false
            }
        },
        async leerUrl(id) {
            this.loadingDoc = true
            try {
                const docSnap = await getDoc(doc(db, 'urls', id))
                return docSnap.data().name
            } catch (error) {
                console.log(error.message)
            } finally {
                this.loadingDoc = false
            }
        },
        async updateUrl(id, name) {
            this.loadingDoc = true
            try {
                await updateDoc(doc(db, 'urls', id), { name })
                this.documents = this.documents.map(item =>
                item.id === id ? { ...item, name } : item
                )
            } catch (error) {
                console.log(error.message)
            } finally {
                this.loadingDoc = false
            }
        }
    },
})