import { Fragment, useEffect, useState } from "react";
import Header from "../../component/header/header";
import { useUserStore } from "../../store/user-store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/loading/Loading";
import TicketItem from "../../component/ticket/ticketItem";

function MyTicket() {
    const {user} = useUserStore()
    const [tickets, setTickets] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const loadData = async()=>{
        if(user === undefined){
            navigate('/')
        }
        setIsLoading(true)

        const {data} = await axios.post('http://localhost:5000/ticket/my-ticket',{
            idUser: user.id
        })
        setTickets(data)
        setIsLoading(false)
    }
    useEffect(()=>{
        loadData()
    },[])
    return ( 
        <Fragment>
            {
                isLoading ? <Loading/> :
                <div id="my-ticket">
                     <Header/>
                     <div className="tickets grid grid-cols-12 mt-24 px-4">
                        {
                            tickets?.map((item, index)=>{
                                return (
                                    <div key={index} className="lg:col-span-4 md:col-span-6">
                                        <TicketItem item={item} className={'mt-3 ml-2'}/>
                                    </div>
                                )
                            })
                        }
                     </div>
                </div>
            }
        </Fragment>
     );
}

export default MyTicket;