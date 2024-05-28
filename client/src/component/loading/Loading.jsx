import './loading.css'
function Loading() {
    return (  
        <div className='loader_wrapper flex items-center justify-center'>
            <div className="loader">
                <span />
                <span />
                <span />
                <span />
            </div>
        </div>
    );
}

export default Loading;