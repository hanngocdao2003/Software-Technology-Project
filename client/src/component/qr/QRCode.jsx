import { useEffect, useState } from 'react';
import { images } from '../../source/images';
import { Card } from '../../config/card';
import { usePayTicket } from '../../store/pay';
import { Fragment } from 'react';
import Loading from '../loading/Loading';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function QR({ className }) {
    const [qr, setQR] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { amount, description } = usePayTicket();
    const { id } = useParams();
    const navigate = useNavigate();
    const loadQRCode = async () => {
        setIsLoading(true);
        const QR =
            await `https://img.vietqr.io/image/${Card.BANK_ID}-${Card.ACCOUNT_NO}-${Card.TEMPLATE}.png?amount=${amount}&addInfo=Thanh toan ve xe ${description}id=${id}`;
        setQR(QR);
        setIsLoading(false);
    };
    const handleCheckPaid = async () => {
        const { data } = await axios.get(
            `https://script.googleusercontent.com/macros/echo?user_content_key=VdvILEjkR7prGau60nO6JywHzOdRjL-e7y6Ls7Towy1QCWFy1Z1CQAbuyNFFIh6gYu_5VLINXfignFzfMkyh6ZSlYZaXQfRXm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJXUcFNWVk6SD_eNLQSqM2jGqw2ZNFhvoOCBoE1DTGpRJg9N06TZDERdlXyQwVs0Q9olhK1kW-q9i8z1Bes2eXal1G61OByJXNz9Jw9Md8uu&lib=MOqSGi395BE9CLYWj1QBkvqhHvNT7C3Ew`,
        );
        const lastPaid = data.data[data.data.length - 1];
        console.log(lastPaid);
        if (lastPaid['Mô tả'].includes(`Thanh toan ve xe ${description.replace(/,\s*/g, '')}id${id}`)) {
            navigate('/');
        }
    };
    setInterval(() => {
        handleCheckPaid();
    }, 5000);
    useEffect(() => {
        loadQRCode();
    }, []);
    // console.log(description.replace(/,\s*/g, ''));
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
