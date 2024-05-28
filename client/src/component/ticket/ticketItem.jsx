import {  faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TicketItem({className,item}) {
    return ( 
    <div className={`${className} p-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}>
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wItj4J5-2RXjU0o7CoRz8wIbYt3JpCfM5M6wpdPWGYLIcE3kxy28yzlEsVasUUMmU_w&usqp=CAU" alt=""/>
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span>{item.vehicle.departure_location}</span>
                <span className="px-3"><FontAwesomeIcon icon={faArrowRight}/></span>
                <span>{item.vehicle.destination}</span>
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <ul>
                    <li className=""><span>Khởi hành</span>: {item.vehicle.time}</li>
                    <li>Dự kiến: {item.vehicle.timeIntend}</li>
                    <li>Ghế: {item.chair}</li>
                    <li>Biển số: {item.vehicle.licensePlate}</li>
                    <li>Trạng thái: {item.isBougth ? 'Đã mua': 'Chưa mua'}</li>
                </ul>
            </p>
        </div>
    </div>
     );
}

export default TicketItem;