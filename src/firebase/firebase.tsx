import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { collection, getDoc, doc, getDocs,setDoc } from 'firebase/firestore'
import {DayReview, IUser, Task} from "../types";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"

const firebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGER_SENDING_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
})

export const db = getFirestore()
export const auth = getAuth()

export const getUsers = async () => {
    return new Promise(async (resolve, reject) => {
        const userRef = collection(db, 'users')
        const userSnap  = await getDocs(userRef)
        const arr:Array<IUser> = []

        userSnap.forEach((user)=>{
            arr.push({id: user.data()?.id, name: user.data()?.name})
        })

        if(!arr[0]) {
            reject(new Error('No users'))
        }
        resolve(arr)
    })
}

export const getTasks = async  () => {
    return new Promise( async (resolve, reject) => {

        const userRef = collection(db, 'users')
        const userSnap  = await getDocs(userRef)
        const arr:Array<IUser> = []

        userSnap.forEach((user)=>{
            arr.push({id: user.data()?.id, name: user.data()?.name})
        })
        if(!arr[0]) {
            reject(new Error('No users'))
        }
        const users = Promise.all(
            arr.map(async (user)=>{
                const tasksRef = doc(db, 'users', ...[user.id, 'data', 'tasks'])
                const tasks = await getDoc(tasksRef)
                const arr = []
                for (let key in tasks.data()) {
                    arr.push(tasks.data()![key])
                }
                return {
                    name: user.name,
                    id: user.id,
                    tasks: [...arr.sort()]
                }
            })
        )

        resolve(users)
    })
}

export const getUserDay = async (date:string) => {
   return new Promise( async (resolve, reject) => {
       const userRef = collection(db, 'users')
       const userSnap  = await getDocs(userRef)
       const arr:Array<IUser> = []
       userSnap.forEach((user)=>{
           arr.push({id: user.data()?.id, name: user.data()?.name})
       })
       if(!arr[0]) {
           reject(new Error('No users'))
       }
       const users = Promise.all(
           arr.map(async (user)=>{
               const dayRef = doc(db,'users',  ...[user.id, 'workingday', date])
               const day = await getDoc(dayRef)
               const tasks:Array<Task> = []
               let currentTask = 'Нет активных задач',
                   online      = false,
                   start       = 'Не на смене',
                   end         = 'Не на смене',
                   tasksCount = 0

               const snap = day.data()
                       if (snap) {

                           start = snap.start ? snap.start : 'Не на смене'
                           end = snap.end ? snap.end :
                               snap.start ? 'Смена не окончена' : 'Не на смене'
                           online = snap.start ? !snap.end ? true : false : false
                           if (snap.tasks[0]) {
                               const taskArr = snap.tasks
                               tasksCount = taskArr.length
                               taskArr.forEach((item:Task)=> {
                                   if (item.current) {
                                       currentTask = item.name
                                   }
                                   tasks.push({
                                       name: item.name,
                                       start: item.start,
                                       end: item.end ? item.end : 'Задача в работе',
                                       time: item.time ? item.time : 'Задача в работе'
                                   })
                               })
                           }
                       }

               return {
                   name: user.name,
                   online,
                   start,
                   end,
                   currentTask,
                   tasksCount,
                   tasks: [...tasks]
               } as DayReview
           })
       )
        resolve(users)
    })
}





export const signIn = async (email:string, password:string) => {
    return new Promise ( (resolve, reject) => {
       signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                resolve({email: userCredential.user.email, uid: userCredential.user.uid})
            })
            .catch((error) => {
                reject(new Error(error.message))
            })
    })
}

export const userSignOut = async () => {
    return new Promise((resolve, reject) => {
        signOut(auth).then(() => {
           resolve('Signed out')
        }).catch((error) => {
            reject(new Error(error.message))
        })
    })
}