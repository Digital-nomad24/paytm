import {atom, selector} from 'recoil'
import axios from 'axios'
export const usernameatom=atom({
    key:'dassad',
    default:''
})
export const firstnameatom=atom({
    key:'inputAtom6',
    default:''
})
export const lastnameatom=atom({
    key:'inputAtom4',
    default:''
})
export const passwordatom=atom({
    key:'inputAtom2',
    default:''
})
export const emailatom=atom({
  key:'inputatom2',
  default:''
})
export const tokenatom=atom({
  key:'inputatom3',
  default:''
})
export const filteratom=atom({
  key:'tokenaotm',
  default:''
})
export const userStateAtom = atom({
  key: 'atomuserState',
  default:''
})
export const userStateAtom2 = atom({
  key: 'atomuserSastate',
  default:''
})
export const fetchStateAtom=atom({
  key:'fetchState',
  default:selector({
    key:'selectoerkey',
    get:async()=>{
    const token = localStorage.getItem('token')
    const res=await axios.get('http://localhost:3000/api/v1/account/balance', {
    headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'authorization': `Bearer ${token}`
   }})
   return res.data
  }
  })
  })

export const userfilter=atom({
  key:"userfilteratom",
  default:['one']
})
export const sendammount=atom({
  key:"atomsend",
  default:0
})

