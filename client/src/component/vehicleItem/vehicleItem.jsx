import './vehicle.scss'
import { Link } from 'react-router-dom';
function VehicleItem({key,vehicle}) {
    return ( 
        <div className="lg:w-6/12 vehicle-item">
            <div key={key} className="bg-white rounded-2xl  px-6 py-8 mb-5 ml-5 ">
                <div className="head-vehicle flex">
                    <div className="schedule flex justify-between items-center flex-1 ">
                        <div className="time-and-from">
                            <h3 className="time mb-3 text-xl">{vehicle.time}</h3>
                            <h4 className="from">{vehicle.to}</h4>
                        </div>
                        <div className="time-and-dest">
                        <h3 className="time mb-3 text-xl">{vehicle.timeIntend}</h3>
                            <h4 className="from">{vehicle.dest}</h4>
                        </div>
                    </div>
                    <div className="type-and-price w-40 ml-5">
                        <div className="type">
                            <p className="mb-3 text-sm font-bold text-center">Giường</p>
                            <h4 className="price text-lg font-bold text-center">{vehicle.price} VND</h4>
                        </div>
                    </div>
                </div>
                <div className="body-vehicle"></div>
                <div className="footer-vehicle flex items-center justify-end mt-5">
                    <button className='btn px-3 py-2 rounded-2xl text-white hover:cursor-pointer'><Link to={`/book-vehicle/${vehicle.id}`} >Chọn chuyến</Link></button>
                </div>
            </div>
        </div>
     );
}

export default VehicleItem;