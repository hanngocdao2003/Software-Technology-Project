import { useContext } from 'react';
import { DataContext } from '../../page/BookVehicle/BookVehicle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../utils/toast';
import { useInformationStore } from '../../store/information-user-store';
import { useUserStore } from '../../store/user-store';
import { useNavigate } from 'react-router-dom';

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function ButtonCheckout({ onClick }) {
    // const data = useContext(DataContext)
    const { email, phoneNumber, name } = useInformationStore();
    // console.log(email, phoneNumber, name);
    const { user } = useUserStore();
    const navigate = useNavigate();
    const checkInvalidate = () => {
        if ((email === ' ') & (name === '') & (phoneNumber === 0)) {
            toast.warn('Vui lòng nhập đầy đủ thông tin', toastOption);
            return false;
        }
        if (!REGEX_EMAIL.test(email)) {
            toast.warning('Email không đúng', toastOption);
            return false;
        }
        if (name.length === 0) {
            toast.warning('Vui lòng nhập tên', toastOption);
            return false;
        }
        if (phoneNumber.length !== 10) {
            toast.warning('Số điện thoại không hợp lệ', toastOption);
            return false;
        }
        return true;
    };
    const handleCheckout = async () => {
        // if(user === null){
        //     navigate('/login')
        //     return;
        // }
        if (checkInvalidate()) {
            onClick((prev) => !prev);
            return;
        }
    };
    return (
        <button onClick={handleCheckout} className="checkout-btn px-4 py-1 mt-4 bg-orange-500 text-white rounded-2xl">
            Thanh toán
        </button>
    );
}

export default ButtonCheckout;
