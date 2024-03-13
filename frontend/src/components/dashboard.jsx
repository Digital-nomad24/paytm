
import { Balance } from "../css_components/Balance"
import Appbar from '../css_components/Appbar'
import {User} from '../components/user'
import { fetchStateAtom } from "./atoms"
import { selector, useRecoilValue } from "recoil"
export default function Dashboard(){ 
        const getB=selector({
        key:'selector1',
        get:({get})=>{
          const balance=get(fetchStateAtom)
          return balance.balance ;
        }
      })
      const balance=useRecoilValue(getB)
    return (
        <div>
            <Appbar/>
            <br />
            <h3><Balance value={balance}></Balance></h3>
            <User></User>
        </div>
    )
}