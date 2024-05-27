import { Link } from "react-router-dom";
import './search.scss'
import axios from 'axios'
import { useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {useOnClickOutside} from '../../hooks/useOnClickOutSide'
import { FALSE } from "sass";
function Search() {
    const [to ,setTo] = useState('')
    const [dest ,setDest] = useState('')
    const [showTo , setShowTo] = useState(false)
    const [showDest , setShowDest] = useState(false)
    const [date, setDate] = useState('')
    const [ticketCount, setTicketCount] = useState(1)
    const [province , setProvince] = useState([])
    const [historySearch, setHistorySearch] = useState([])
    // Ref
    const provinceRef = useRef()

    // History
    const navigate = useNavigate()
    const processingProvince = async ()=>{
        try {
            const {data} = await axios.get('http://localhost:5000/province');
            await setProvince(data.provinces)
            console.log('re-render');
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(()=>{
        processingProvince()
        // 
        setHistorySearch(JSON.parse(localStorage.getItem('history-search')))
    },[])
    useOnClickOutside(provinceRef,()=>{
        if(showTo){
            setShowTo(false)
        }
        if(showDest){
            setShowDest(false)
        }
    })
    const checkValueValidate = ()=>{
        return !(dest.length === 0 || to.length===0);
    }
    const handleSearch = ()=>{
        if(checkValueValidate()){
            if(historySearch === null){
                localStorage.setItem('history-search',JSON.stringify([{to ,dest,date}]))
            }
            else if(historySearch.length >5){
                historySearch.shift()
                localStorage.setItem('history-search',JSON.stringify(historySearch))
            }
            else{
                historySearch.push({to,dest ,date})
                localStorage.setItem('history-search',JSON.stringify(historySearch))
            }
            navigate(`/search?to=${to}&dest=${dest}&date=${date}&ticket=${ticketCount}`)
        }
       

    }
    return ( 
        <div className="search bg-white px-6 pt-2 pb-6 mt-14 w-full">
            <div className="instruct flex justify-end items-center">
                <p>
                    <Link to='/instruct-ticket'>Hướng dẫn mua vé</Link>
                </p>
            </div>
            <div className="main-search flex mt-4 gap-3 py-5">
                <div className="item-search sm:w-1 lg:w-1/4">
                    
                    <label className="search-label font-semibold" htmlFor="">Điểm đi</label>
                    <div className="input-search mt-4" onClick={()=>setShowTo(true)}>
                        <p className="h-full w-full text-center flex items-center ml-4">{to.length ===0 ? 'Chọn điểm đi': to}</p>
                        { 
                        showTo && (
                            <div  ref={provinceRef}  className="province bg-white px-3 py-2 rounded-lg ">
                            <ul className="list-province">
                                {province.map((province, index)=>{
                                    return <li className="px-1 py-2 cursor-pointer  hover:bg-slate-300" key={index} onClick={()=>{
                                        setTo(province.name)
                                        setShowTo(false)
                                    }}>{province.name}</li>
                                })}
                             </ul>
                        </div>
                        )
                        }
                    </div>
                </div>
                <div className="item-search  sm:w-1 lg:w-1/4">
                    <label className="search-label font-semibold" htmlFor="">Điểm đến</label>
                    <div className="input-search mt-4" onClick={()=>setShowDest(true)}>
                        <p className="h-full w-full text-center flex items-center ml-4">{dest.length ===0 ? 'Chọn điểm đến': dest}</p>
                       {
                        showDest && (
                            <div  ref={provinceRef}  className="province bg-white px-3 py-2 rounded-lg ">
                            <ul className="list-province">
                                {province.map((province, index)=>{
                                    return <li className="px-1 py-2 cursor-pointer hover:bg-slate-300"  key={index} onClick={()=>{
                                        setDest(province.name)
                                        setShowDest(false)
                                        console.log(showDest);
                                    }} >{province.name}</li>
                                })}
                            </ul>
                    </div>
                        )
                       }
                    </div> 
                </div>
                <div className="item-search  sm:w-1 lg:w-1/4">
                    <label className="search-label font-semibold" htmlFor="">Ngày đi</label>
                    <div className="input-search mt-4 overflow-hidden">
                        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="h-full w-full px-2 outline-none"/>
                    </div>
                </div>
                <div className="item-search  sm:w-1 lg:w-1/4">
                    <label className="search-label font-semibold" htmlFor="">Số vé</label>
                    <div className="input-search mt-4 overflow-hidden">
                        <input type="number" className="h-full w-full px-2" value={ticketCount}
                        onChange={(e)=>{
                            if(e.target.value <=0){
                                return
                            }
                            setTicketCount(e.target.value)
                        }}
                         />
                    </div>
                </div>
            </div>
            <div className="search-recent text-black">
                <p className="recent-title text font-semibold">Tìm kiếm gần đây</p>
                <div className="location flex gap-3">
                    {
                        historySearch?.length ===0 ? (<div>Không có tìm kiếm nào gần đây</div>) :
                        historySearch?.map((item, index)=>{
                            return (
                                <div key={index} 
                                    className="location-item bg-slate-300 cursor-pointer" 
                                    onClick={()=>navigate(`search?to=${item.to}&dest=${item.dest}&date=${item.date}`)}
                                >
                                    <div className="name">{item.to} - {item.dest}</div>
                                    <div className="date">{item.date}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <button className="search-btn text-center mt-2 px-1 py-2 cursor-pointer" onClick={handleSearch}>Tìm kiếm</button>
        </div>
     );
}

export default Search;