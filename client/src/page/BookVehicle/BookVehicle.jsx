import { useParams } from 'react-router-dom';
import Header from '../../component/header/header';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsLeftRight, faCouch, faUnderline } from '@fortawesome/free-solid-svg-icons';
import { images } from '../../source/images';
import Loading from '../../component/loading/Loading';
import './bookVehicle.scss';
import TicketItem from '../../component/ticket/ticket';
import InformationUser from '../../component/informationUser/InformationUser';
import InformationVehicle from '../../component/informationVehicle/InformationVehicle';

// CONSTANT
const formInformation = [
    {
        label: 'Họ và tên',
        isRequired: true,
        key: 'name',
    },
    {
        label: 'Email',
        isRequired: true,
        key: 'email',
    },
    {
        label: 'Số điện thoại',
        isRequired: true,
        key: 'phoneNumber',
    },
];
export const DataContext = createContext();
console.log(DataContext);
function BookVehicle() {
    const [vehicle, setVehicle] = useState({});
    const [ticket, setTicket] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [ticketCount, setTicketCount] = useState(0);
    const [nameChairPick, setNameChairPick] = useState([]);
    const [data, setData] = useState(null);
    const { id } = useParams();
    const [date, setDate] = useState(null);
    const [formattedDate, setFormattedDate] = useState('');
    useEffect(() => {
        setDate(() => new Date(vehicle.date));
    }, []);
    useEffect(() => {
        if (date) {
            const formatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            setFormattedDate(formatted);
        }
    }, [date]);
    const loadData = async () => {
        const { data } = await axios.get(`http://localhost:5000/book-ticket/${id}`);
        setVehicle(data);
        setLoading(false);
    };
    useEffect(() => {
        loadData();
    }, []);
    // console.log(vehicle);
    const handleIncrementTicket = (item) => {
        if (ticketCount >= 5) {
            return;
        }
        // Kiểm tra xem ghế đã được chọn chưa
        if (nameChairPick.includes(item.chair)) {
            // Nếu ghế đã được chọn, giảm ticketCount và xóa ghế khỏi nameChairPick
            setTicketCount((prev) => prev - 1);
            setNameChairPick(nameChairPick.filter((chair) => chair !== item.chair));
        } else {
            // Nếu ghế chưa được chọn, tăng ticketCount và thêm ghế vào nameChairPick
            setTicketCount((prev) => prev + 1);
            setNameChairPick([...nameChairPick, item.chair]);
            console.log(nameChairPick);
        }
    };
    const receivedData = (data) => {};

    return isLoading ? (
        <Loading />
    ) : (
        <DataContext.Provider value={nameChairPick}>
            <div className="book-vehicle">
                <Header />
                {/* Begin overview */}
                <div
                    className="overview flex justify-center h-80"
                    style={{ backgroundImage: `url(${images.banner1})` }}
                >
                    <div className="location flex justify-center flex-col">
                        <div className="flex items-center">
                            <div className="to w-60 text-center">
                                <h1 className="text-2xl font-bold text-white">{vehicle.departure_location}</h1>
                            </div>
                            <div className="icon mx-4 text-white">
                                <FontAwesomeIcon icon={faArrowsLeftRight} />
                            </div>
                            <div className="dest w-60 text-center">
                                <h1 className="text-2xl font-bold text-white">{vehicle.destination}</h1>
                            </div>
                        </div>
                        <div className="time text-center mt-5">
                            <h1 className="text-white">{`${vehicle.time},${formattedDate}`}</h1>
                        </div>
                    </div>
                </div>
                {/* End Overview */}
                <div className="book-ticket grid grid-cols-12 gap-4 py-10">
                    <div className="left col-span-8 flex flex-col items-end ">
                        <div className="list-tickets w-11/12 h-80 flex flex-wrap gap-2 bg-white rounded-xl px-4 py-6 ">
                            {vehicle.tickets.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => handleIncrementTicket(item)}>
                                        <TicketItem ticket={item} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="right col-span-4">
                        <InformationVehicle
                            vehicle={vehicle}
                            date={formattedDate}
                            ticketCount={ticketCount}
                            nameChairPick={nameChairPick}
                            data={data}
                            amount={ticketCount * vehicle.price}
                            classNames="h-80"
                        />
                    </div>
                </div>
                <InformationUser formInformation={formInformation} sendData={receivedData} />
            </div>
        </DataContext.Provider>
    );
}

export default BookVehicle;
