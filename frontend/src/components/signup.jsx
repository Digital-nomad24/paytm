import {firstnameatom, lastnameatom, passwordatom,usernameatom,emailatom,tokenatom} from "./atoms"
import {useRecoilState} from 'recoil'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../css_components/BottomWarning"
import { Button } from "../css_components/Button"
import { Heading } from "../css_components/Heading"
import { InputBox } from "../css_components/InputBox"
import { SubHeading } from "../css_components/SubHeading"
export default function Signup(){
    const navigate=useNavigate();
    const [password,setpassword]=useRecoilState(passwordatom)
    const [username,setusername]=useRecoilState(usernameatom)
    const [firstname,setfirstname]=useRecoilState(firstnameatom)
    const [lastname,setlastname]=useRecoilState(lastnameatom)
    const [email,setemail]=useRecoilState(emailatom)
    const[token,settoken]=useRecoilState(tokenatom)
    return <div>
     <div className="bg-slate-300 h-screen flex justify-center">
     <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e) => {
          setusername(e.target.value);
        }} placeholder="John" label={"user Name"} />
        <InputBox onChange={(e) => {
          setfirstname(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e) => {
          setlastname(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={(e) => {
          setemail(e.target.value);
        }} placeholder="abc@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setpassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label="Submit" onClick={async () => {
            const postData = {
                username:username,
                firstName:firstname,
                password:password,
                lastName:lastname,
                Email:email
              };
              console.log(postData)
              await axios.post('http://localhost:3000/api/v1/user/signup',postData)
              .then(res=>{
                console.log(res.data)
                console.log(res.data.token)
                settoken(res.data.token)
                localStorage.setItem('token', res.data.token);
              })
              navigate('/dashboard')
        }}></Button>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>"
</div>
</div>
<br />
</div>
}