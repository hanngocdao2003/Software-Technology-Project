import { useEffect, useRef, useState } from 'react';
import { images } from '../../source/images';
import { Card } from '../../config/card';
import { usePayTicket } from '../../store/pay';
import { Fragment } from 'react';
import Loading from '../loading/Loading';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '../../store/user-store';
import { useInformationStore } from '../../store/information-user-store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from '../../utils/toast';

function QR({ className }) {
    const [qr, setQR] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { amount, description } = usePayTicket();
    const {phoneNumber , name, email} = useInformationStore()
    const { user, accessToken} = useUserStore();
    console.log(accessToken.accessToken);
    const { id } = useParams();
    const navigate = useNavigate();
    const intervalRef = useRef(null);
    const loadQRCode = async () => {
        setIsLoading(true);
        const QR =
            await `https://img.vietqr.io/image/${Card.BANK_ID}-${Card.ACCOUNT_NO}-${Card.TEMPLATE}.png?amount=${amount}&addInfo=Thanh toan ve xe ${description}id=${id}idUser=${user.id}`;
        setQR(QR);
        setIsLoading(false);
    };
    const byTicket = async()=>{
        try {
            const {data} = await axios.post('http://localhost:5000/book-ticket/buy', {
            idVehicle: +id,
            idUser: user.id,
            chair: `[${description}]`,
            phone_customer: phoneNumber,
            name_customer: name,
            email_customer: email
        },{
            headers: {
                'authorization': `Bearer ${accessToken.accessToken}`
            }
        })
        console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleCheckPaid = async () => {
        const { data } = await axios.get(
            `https://script.googleusercontent.com/macros/echo?user_content_key=VdvILEjkR7prGau60nO6JywHzOdRjL-e7y6Ls7Towy1QCWFy1Z1CQAbuyNFFIh6gYu_5VLINXfignFzfMkyh6ZSlYZaXQfRXm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJXUcFNWVk6SD_eNLQSqM2jGqw2ZNFhvoOCBoE1DTGpRJg9N06TZDERdlXyQwVs0Q9olhK1kW-q9i8z1Bes2eXal1G61OByJXNz9Jw9Md8uu&lib=MOqSGi395BE9CLYWj1QBkvqhHvNT7C3Ew`,
        )
        const lastPaid = data.data[data.data.length - 1];
        console.log(lastPaid);
        if (lastPaid['Mô tả'].includes(`${description.replace(/,\s*/g, '')}id${id}idUser${user.id}`)) {
            clearInterval(intervalRef.current); // Clear interval
             byTicket()
        }
    };
    setInterval(() => {
        handleCheckPaid();
    }, 5000);
    useEffect(() => {
        loadQRCode();
    }, []);
    useEffect(()=>{
        intervalRef.current = setInterval(() => {
            handleCheckPaid();
          }, 5000);
      
          return () => {
            // Clear interval on component unmount
            clearInterval(intervalRef.current);
          };
    },[])
    return (
        <Fragment>
            {isLoading ? (
                <Loading />
            ) : (
                <div className={className}>
                    <img className="w-full h-full" src={qr} alt="" />
                </div>
            )}
        </Fragment>
    );
}

export default QR;
