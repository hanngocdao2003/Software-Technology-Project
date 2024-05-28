import { faCouch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TicketItem({ticket}) {
    return ( 
        <div className= {`${ticket.isBougth? 'cursor-not-allowed bg-red-300': 'cursor-pointer bg-green-100'} flex flex-col gap-1 py-2 px-3 `}>
            <FontAwesomeIcon icon={faCouch} />
            <span>{ticket.chair}</span>
        </div>
     );
}

export default TicketItem; 