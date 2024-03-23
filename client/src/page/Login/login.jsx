import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import  {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async()=>{
        try{
          const {data} = await axios.post('http://localhost:3005/auth/login',{
            email,
            password
        })
        if(data.status ===200){
          console.log(data.accessToken.accessToken);
          Cookies.set('jwt', JSON.stringify(data.accessToken.accessToken), {
            expires: 1
          })
          Cookies.set('user',JSON.stringify( data.user), {
            expires: 1
          })
          navigate('/')
        }
        else{
          toast('Vui lòng nhập đúng email và mật khẩu',{
            position: "bottom-right"
          })
        }
        }
        catch(e){
          toast('Vui lòng nhập đúng email và mật khẩu',{
            position: 'bottom-right',
          })
        }
        
    }
    
    return ( 
        <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Đăng nhập
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form 
                className="space-y-6" 
                action="#" method="POST" 
                onSubmit={(e)=> e.preventDefault()}

            >
                <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                </label>
                <div className="mt-2">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Mật khẩu
                    </label>
                    <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Quên mật khẩu ?
                    </a>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSubmit}
                >
                    Đăng nhập
                </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
            Bạn chưa có tài khoản ?{' '}
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Đăng kí
            </Link>
          </p>
            </div>
        </div>
    
     );
}

export default Login;