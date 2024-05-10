import { useContext } from "react";
import { DataContext } from "../../page/BookVehicle/BookVehicle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from "../../utils/toast";

const REGEX_EMAIL =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
function ButtonCheckout({onClick}) {
    const data = useContext(DataContext)
    const checkInvalidate = ()=>{
      if(data === null){
            toast.warn('Vui lòng nhập đầy đủ thông tin', toastOption)
            return false;
        }
         if(!REGEX_EMAIL.test(data.email)){
            toast.warning('Email không đúng', toastOption)
            return false;
        }
        if(data.name.length ===0){
            toast.warning('Email không đúng', toastOption)
            return false;
        }
        if(data.phoneNumber.length !==10){
            toast.warning('Số điện thoại không hợp lệ', toastOption)
            return false;
        }
        return true;
    }
    const handleCheckout =async ()=>{
        if(checkInvalidate()){   
            onClick((prev)=> !prev)
        }
    }
    return ( 
        <button onClick={handleCheckout} className="checkout-btn px-4 py-1 mt-4 bg-orange-500 text-white rounded-2xl" >Thanh toán</button>
     );
}

export default ButtonCheckout;