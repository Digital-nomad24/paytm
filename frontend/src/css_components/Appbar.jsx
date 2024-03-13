import { useNavigate } from 'react-router-dom'
export default function Navbar() {
const navigate=useNavigate()
  return <div> 
    <nav className="bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-white bg-gray-800 py-4 px-6 ">Paytm</span>
          </div>
        </div>
                <div onClick={()=>{
                    localStorage.removeItem('token')
                    navigate('/')
                }} className="hidden sm:ml-6 text-white hover:bg-gray-200 hover:text-gray-800 sm:block rounded-full p-2 cursor-pointer"
                >
                  Sign Out
                </div>
                </div>
        </div>
        </nav>
      </div>  
}
