import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.scss'
import { images } from "../../source/images";
import axios from "axios";
import { toastOption } from "../../utils/toast";
function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const checkValidation = ()=>{
        console.log('check');
        if(email.length == 0 ){
            toast.error('Vui lòng nhập đúng email',toastOption)
            return false;
        }
        if(password <= 5){
            toast.error('Vui lòng nhập mật khẩu tối thiểu 6 kí tự',toastOption)
            return false
        }
        if(password !== confirmPassword){
            toast.error('Mật khẩu xác nhận không không khớp',toastOption)
            return false;
        }
        return true;
    }
    const navigate = useNavigate()
    const handleSubmit = async()=>{
        if(checkValidation()){
            try {
                const  {data} = await axios.post('http://localhost:5000/auth/register',{
                    email,
                    password
                })
                if(data.accessToken){
                    navigate('/login')
                }
            } catch (error) {
                alert(error)
            }
        }
    }

    return ( 
        <div id="register" className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="logo flex justify-center items-center h-14">
                <img
                    className="mx-auto h-10 w-auto"
                    src={images.logo}
                    alt="Your Company"
                />
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Đăng kí
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
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Nhập lại mật khẩu
                    </label>
                    <div className="text-sm">
                    </div>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
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
                    Đăng kí
                </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
            Bạn đã có tài khoản ?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Đăng nhập
            </Link>
          </p>
            </div>
        </div>
     );
}

export default Register;