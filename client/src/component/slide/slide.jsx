import { useEffect, useState } from "react";
import { images } from "../../source/images";
import './slide.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowsLeftRight} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
function Slide({children}) {
    const slides = [
        {
         image: images.banner1,
         to: 'Hà Nội',
         des: 'Hà Giang'
        },
        {
            image: images.banner2,
            to: 'TP.Hồ Chí Minh',
            des: 'Đà Lạt'
        },
        {
            image: images.banner3,
            to: 'Quảng Ngãi',
            des: 'TP.Hồ Chí Minh'
        },
        {
            image: images.banner4,
            to: 'Cao Bằng',
            des: 'Lạng Sơn'
        },
    ]
    const [bus, setBus] = useState(0)
    useEffect(()=>{
        setTimeout(()=>{
            if(bus >= slides.length-1){
                setBus(0)
            }
            setBus((prev)=> prev+1)
        },2000)
    },[bus])
    return ( 
        <div id="slide" style={{backgroundImage: `url(${slides[bus]?.image})`}} className={`w-full text-white flex flex-col items-center`}>
            <div className="main-caption mt-20 ">
                <h2 className="text-2xl text-center font-bold">Chuyến xe có tần số hoạt động cao</h2>
               <div className="to-dest flex gap-11 my-6 items-center justify-center text-3xl font-extrabold">
                    <h1>{slides[bus]?.to}</h1>
                    <FontAwesomeIcon icon={faArrowsLeftRight} />
                    <h1>{slides[bus]?.des}</h1>
               </div>
                <div className="text-center mt-4">
                    <Link className="link mt-9" to={`to=${slides[bus]?.to}&dest=${slides[bus]?.des}`}>Đặt vé ngay</Link>
                </div>
            </div>
            <div className="text-white">{children}</div>
        </div>
     );
}

export default Slide