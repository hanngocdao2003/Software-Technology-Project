import { useEffect, useState } from 'react';
import ButtonCheckout from '../button/CheckoutBtn';
import { PayPalButton } from 'react-paypal-button-v2';
import PayPal from '../paypal/PayPal';
import PopupWrapper from '../popup/PopupWrapper';
import QR from '../qr/QRCode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons/faArrowAltCircleRight';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { usePayTicket } from '../../store/pay';

function InformationVehicle({ vehicle, nameChairPick, ticketCount = 0, classNames, date, amount }) {
    const [isShowPaypal, setIsShowPayPal] = useState(false);
    const { setAmount, setDescription } = usePayTicket();
    useEffect(() => {
        setAmount(amount);
        setDescription(nameChairPick.toString());
    }, [amount]);
    return (
        <div className={`trip-information w-3/4 ${classNames} bg-white px-4 py-6 rounded-xl`}>
            <h1 className="trip-information-title font-bold ">Thông tin chuyến đi</h1>
            <div className="trip-information-item flex justify-between pt-2">
                <h1 className="font-bold">Tuyến xe</h1>
                <h1>
                    <span>{vehicle.destination}</span>
                    <span>
                        <FontAwesomeIcon className="mx-2" icon={faArrowRight} />
                    </span>
                    <span>{vehicle.destination}</span>
                </h1>
            </div>
            <div className="trip-information-item flex justify-between">
                <h1 className="font-bold pt-2">Thời gian xuất bến</h1>
                <h1>
                    {vehicle.time} {date}
                </h1>
            </div>
            <div className="trip-information-item flex justify-between">
                <h1 className="font-bold pt-2">Số lượng ghế</h1>
                <h1>{ticketCount}</h1>
            </div>
            <div className="font-bold trip-information-item flex justify-between">
                <h1 className="pt-2">Số ghế</h1>
                <h1>
                    <span>{nameChairPick.toString()}</span>
                </h1>
            </div>
            <div className="trip-information-item flex justify-between font-bold">
                <h1 className="pt-2">Tổng tiền</h1>
                <h1>{vehicle.price * ticketCount}</h1>
            </div>
            <div className="checkout text-center">
                <ButtonCheckout onClick={setIsShowPayPal} />
            </div>
            <div className="paypal w-full mt-3">
                {isShowPaypal && (
                    <PopupWrapper onClose={setIsShowPayPal}>
                        <QR className={'w-80 h-80'} />
                        <div className="p-5">
                            <span className="font-bold">Hoặc</span>
                        </div>
                        <PayPal />
                    </PopupWrapper>
                )}
            </div>
        </div>
    );
}

export default InformationVehicle;
