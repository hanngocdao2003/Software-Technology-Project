import { images } from "../../source/images";

function QR({className}) {
    return ( 
        <div className={className}>
            <img className="w-full h-full" src={images.qr} alt="" />
        </div>
     );
}

export default QR;