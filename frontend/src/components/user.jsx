import { InputBox } from "../css_components/InputBox";
import { Button } from "../css_components/Button";
import { useEffect } from "react";
import axios from "axios";
import { filteratom } from "./atoms";
import { useRecoilState } from "recoil";
import { userfilter } from "./atoms";
import { useNavigate } from "react-router-dom";
export function User()
{
    const [users,setUser]=useRecoilState(userfilter)
    const[filter,setfiltervalue]=useRecoilState(filteratom)
    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/filter?filter=${filter}`)
          .then(res => {
            setUser(res.data.user)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [filter]); // Run effect whenever filter changes
    return <div>
        <InputBox label={"enter a name to search your friend"} placeholder={'john'} onChange={(e)=>{
            setfiltervalue(e.target.value)
        }} type="text" />
        {/* {console.log(users)} */}
            {users.map(e=><DisplayUser key={Math.random()} user={e}/>)}
            </div>
        }
function DisplayUser({user}){
    const navigate=useNavigate();
    return  <div className="flex justify-between">
    <div className="flex">
    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
        <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName}
        </div>
    </div>
    <div className="flex flex-col justify-center h-ful">
        <div>
            {user.firstName} {user.lastName}
        </div>
    </div>
    </div>
    <div className="flex flex-col justify-center h-ful ">
            <Button onClick={(e) => {
                navigate("/send?id=" + user.userId + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
</div>
}