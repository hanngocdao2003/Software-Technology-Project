import { useState } from 'react';
import ButtonCheckout from '../button/CheckoutBtn';
import { PayPalButton } from "react-paypal-button-v2";
import PayPal from '../paypal/PayPal';
import PopupWrapper from '../popup/PopupWrapper';
import QR from '../qr/QRCode';

function InformationVehicle({vehicle,nameChairPick,ticketCount=0 , classNames}) {
    const [isShowPaypal, setIsShowPayPal] = useState(false)
    // console.log(isShowPaypal);
    return ( 
        <div className={`trip-information w-3/4 ${classNames} bg-white px-4 py-6 rounded-xl`}>
            <h1 className="trip-information-title font-bold ">Thông tin chuyến đi</h1>
            <div className="trip-information-item flex justify-between">
                <h1>Tuyến xe</h1>
                <h1>{vehicle.destination} => {vehicle.destination}</h1>
            </div>
            <div className="trip-information-item flex justify-between">
                <h1 className="font-bold">Thời gian xuất bến</h1>
                <h1>{vehicle.time} {vehicle.date}</h1>
            </div>
            <div className="trip-information-item flex justify-between">
                <h1 className="font-bold">Số lượng ghế</h1>
                <h1>{ticketCount}</h1>
            </div>
            <div className="font-bold trip-information-item flex justify-between">
                <h1>Số ghế</h1>
                <h1>{nameChairPick.map((item, index)=>{
                    return <span key={index}>{`${item}, `}</span>
                })}</h1>
            </div>
            <div className="trip-information-item flex justify-between font-bold">
                <h1>Tổng tiền</h1>
                <h1>{vehicle.price * ticketCount}</h1>
            </div>
            <div className="checkout text-center">
                <ButtonCheckout onClick={setIsShowPayPal}/>
            </div>
            <div className='paypal w-full mt-3'>
                {
                    isShowPaypal &&
                    <PopupWrapper onClose={setIsShowPayPal}>
                        <QR className={'w-80 h-80'}/>
                        <div className='p-5'>
                            <span className='font-bold'>Or</span>
                        </div>
                        <PayPal/>
                    </PopupWrapper>
                }
            </div>
        </div>
     );
}

export default InformationVehicle;