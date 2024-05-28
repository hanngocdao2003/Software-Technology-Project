import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PayPal from "../paypal/PayPal";

function PopupWrapper({onClose, children}) {
    return ( 
        <div className="popup flex flex-col fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-200 overflow-auto">
            <div className="header-popup h-20 relative">
                <div className="close absolute right-6 top-5 text-lg cursor-pointer " onClick={()=>onClose(false)}>
                    <FontAwesomeIcon icon={faClose}/>
                </div>
            </div>
            <div className="body-popup flex justify-center items-center flex-1  px-5">
                {children}
            </div>
        </div>
     );
}

export default PopupWrapper;