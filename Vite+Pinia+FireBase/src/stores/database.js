import { addDoc, collection, getDocs, getDoc , deleteDoc, updateDoc, doc, query,where } from 'firebase/firestore/lite'
import {defineStore} from 'pinia'
import {db} from '../firebaseConfig'
import {auth} from '../firebaseConfig'
import { nanoid } from 'nanoid'
import router from '../router'

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents:[],
        loadingDoc:false
    }),
    actions:{
        async getUrls(){
            console.log('getUrls ejecutado')
            if (!auth.currentUser){
                console.log('No hay usuarios')
                return
            } 
            this.loadingDoc = true
            this.documents = []
            try {
                const q = query(collection(db,'urls'),where('doc.user','==',auth.currentUser.uid))
                const querySnapshot = await getDocs(q)
                console.log("UID usado:", auth.currentUser.uid);
                console.log("respuesta", querySnapshot);
                querySnapshot.forEach(doc => {
                    this.documents.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                console.log(this.documents)
            } catch (error) {
                console.error(error)
            } finally {
                this.loadingDoc = false
            }
        },
        async addUrl(name) {
            this.loadingDoc = true
            try {
                const new_doc = { name, short:nanoid(6), user:auth.currentUser.uid}
                const docRef = await addDoc(collection(db, 'urls'), {
                    doc:new_doc
                })
                this.documents.push({
                    id:docRef.id,
                    doc:doc
                })
            } catch (error) {
                console.error(error)
            } finally {
                this.loadingDoc = false
            }
        },
        async deleteUrl(id) {
            if (!auth.currentUser) return 
            this.loadingDoc = true
            try {
                await deleteDoc(doc(db, 'urls', id))
                this.documents = this.documents.filter(item => item.id !== id)
                console.log(`Documento eliminado correctamente: ${id}`)
            } catch (error) {
                console.error('Error al eliminar:', error.message)
            } finally {
                this.loadingDoc = false
            }
        },
        async leerUrl(id) {
            this.loadingDoc = true
            try {
                const docSnap = await getDoc(doc(db, 'urls', id))
                return docSnap.data().doc.name
            } catch (error) {
                console.log(error.message)
            } finally {
                this.loadingDoc = false
            }
        },
        async updateUrl(id, name) {
            this.loadingDoc = true
            try {
                await updateDoc(doc(db, 'urls', id), { 'doc.name':name })
                this.documents = this.documents.map(item =>
                item.id === id ? { ...item, doc:{ ...item.doc,name}} : item)
                router.push('/')
            } catch (error) {
                console.log(error.message)
            } finally {
                this.loadingDoc = false
            }
        }
    },
})