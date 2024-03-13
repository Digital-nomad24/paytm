
import {useRecoilState, useRecoilValue,atom} from 'recoil'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../css_components/BottomWarning"
import { Button } from "../css_components/Button"
import { Heading } from "../css_components/Heading"
import { InputBox } from "../css_components/InputBox"
import { SubHeading } from "../css_components/SubHeading"
import { passwordatom,emailatom} from './atoms'
export default function Signin(){
    const navigate=useNavigate()
    const [checkvalue,setcheckvalue]=useRecoilState(passwordatom)
    const [checkvalue1,setcheckvalue1]=useRecoilState(emailatom)
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} onChange={(e)=>{
            setcheckvalue1(e.target.value)
        }} />
        <InputBox onChange={(e)=>{
            setcheckvalue(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <Button label={"submit"} onClick={async ()=>{
              let data = {
                Email:checkvalue1,
                password:checkvalue
              };

              let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'localhost:3000/api/v1/user/signin',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              axios.request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data))
                localStorage.setItem('token', `$response.data.token`);;
              })
              .catch((error) => {
                console.log(error);
              });
              
navigate('/dashboard')
}}></Button>
        <div className="pt-4">
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/"} />
      </div>
    </div>
  </div>
}
