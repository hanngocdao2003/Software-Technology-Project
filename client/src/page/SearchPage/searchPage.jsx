import Header from "../../component/header/header";
import { Link } from "react-router-dom";
import './searchpage.scss'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import VehicleItem from "../../component/vehicleItem/vehicleItem";
function SearchPage() {
    const location = useLocation()
    const [vehicles , setVehicles] = useState([])
    const [to, setTo] = useState('')
    const [dest, setDest] = useState('')
    const [date, setDate] = useState('')
    const [ticketCount, setTicketCount] = useState('')
    // const [results , setResults] = useState()
    const searchResults = async (to,dest,date,ticketCount)=>{
        const {data}  = await axios.get(`http://localhost:5000/search?start=${to}&dest=${dest}&date=${date}`)
        console.log(data);
        setVehicles(data)
    }
    useEffect(()=>{
        const queryParams =new URLSearchParams(location.search)
        setTo(queryParams.get('to'))
        setDest(queryParams.get('dest'))
        setDate(queryParams.get('date').split('-').reverse().join('-'))
        setTicketCount(queryParams.get('ticketCount'))

        searchResults(to,dest,date,ticketCount)

    },[to,dest,date,ticketCount]) 
    return ( 
        <div id="search" className="w-full">
            <Header/>
            <section className="over-view flex justify-center items-center flex-col gap-10">
                <div className="detail text-center">
                    <h1 className="text-white font-bold text-3xl">Quảng Ngãi - TP.Hồ Chí Minh ({vehicles?.length}) </h1>
                    <button className="mt-8 btn-more px-8 py-2 text-white text-sm hover:bg-slate-600 transition-all"><Link className="h-full w-full block" to={'#detail-bus'}>Xem thêm</Link></button>
                </div>
                <div className="sort text-white flex rounded-2xl px-6 py-10 lg:w-5/6 items-center flex-wrap">
                    <label htmlFor="" className="text-lg lg:w-2/12 md:w-11/12 text-center md:mb-4">Bộ lọc</label>
                    <div className="flex gap-2 time-out lg:w-4/12 md:w-11/12 items-center md:mb-4 ">
                        <p className="text-lg mr-3 w-16">Giờ đi</p>
                        <select name="" id="" className="text-black px-2 py-3 md:w-48">
                            <option value="00:00-06:00">Sáng sớm 00:00-06:00</option>
                            <option value="06:00-:12:00">Buổi sáng 06:00-:12:00</option>
                            <option value="12:00-18:00">Buổi chiều 12:00-18:00</option>
                            <option value="18:00-24:00">Buổi tối 18:00-24:00</option>
                        </select>
                    </div> 
                    <div className="flex gap-2 type lg:w-4/12 md:w-11/12 items-center md:mb-4 ">
                        <p className="text-lg mr-3 w-16">Loại xe</p>
                        <select name="" id="" className="text-black px-2 py-3 md:w-48">
                            <option value="Ghế">Ghế</option>
                            <option value="Nằm">Nằm</option>
                            <option value="Limousine">Limousine</option>
                        </select>
                    </div>
                    <div className="sort-search lg:w-2/12 md:w-11/12 text-center">
                        <button className="text-sm text-lg bg-white px-3 py-2 rounded-xl text-black">Tìm kiếm</button>
                    </div> 
                </div>
            </section>
           <div className="w-full flex justify-center bg-black">
                <div className="result  flex flex-wrap lg:w-5/6 py-20">
                    {
                        vehicles.map((vehicle, index)=>{
                            return (
                                <VehicleItem vehicle={vehicle} key={index}/>
                            )
                        })
                    }
                </div>
           </div>
        </div>
     );
}

export default SearchPage;