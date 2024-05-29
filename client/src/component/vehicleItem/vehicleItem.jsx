import './vehicle.scss';
import { Link } from 'react-router-dom';

function VehicleItem({ key, vehicle }) {
    const calculateDuration = (start, end) => {
        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);
        let durationHour = endHour - startHour;
        let durationMinute = endMinute - startMinute;

        if (durationMinute < 0) {
            durationMinute += 60;
            durationHour -= 1;
        }

        return `${durationHour} giờ ${durationMinute} phút`;
    };

    const duration = calculateDuration(vehicle.time, vehicle.timeIntend);

    return (
        <div className="lg:w-6/12 vehicle-item">
            <div key={key} className="bg-white rounded-2xl px-6 py-8 mb-5 ml-5">
                <div className="head-vehicle flex items-center">
                    <div className="schedule flex justify-between items-center flex-1">
                        <div className="time-and-from text-center">
                            <h3 className="time mb-3 text-xl"><b>{vehicle.time}</b></h3>
                            <h4 className="from text-gray-600">{vehicle.departure_location}</h4>
                        </div>
                        <div className="item-cent flex items-center justify-center mx-4">
                            <img src="https://futabus.vn/images/icons/pickup.svg" alt="Biểu tượng đón" />
                            <span><div className="line-horizontal"></div></span>
                            <span>{duration}</span>
                            <span><div className="line-horizontal"></div></span>
                            <img src="https://futabus.vn/images/icons/station.svg" alt="Biểu tượng trạm" />
                        </div>
                        <div className="time-and-dest text-center">
                            <h3 className="time mb-3 text-xl"><b>{vehicle.timeIntend}</b></h3>
                            <h4 className="from text-gray-600">{vehicle.destination}</h4>
                        </div>
                    </div>
                    <div className="type-and-price w-40 ml-5">
                        <div className="type">
                            <p className="mb-3 text-sm font-bold text-center">Giường</p>
                            <h4 className="price text-lg font-bold text-center">{vehicle.price} VND</h4>
                        </div>
                    </div>
                </div>
                <div className="body-vehicle flex justify-between items-center mt-4">
                    <div className="menu-options flex space-x-4">
                        <span className="option">Chọn ghế</span>
                        <span className="option">Lịch trình</span>
                        <span className="option">Trung chuyển</span>
                        <span className="option">Chính sách</span>
                    </div>
                    <button className="btn-choose-trip px-3 py-2 rounded-2xl text-white">
                        <Link to={`/book-vehicle/${vehicle.id}`}>Chọn chuyến</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VehicleItem;
