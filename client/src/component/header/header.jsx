import {images} from '../../source/images';
import {Link, useNavigate} from 'react-router-dom'
import './header.scss'
import { useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '../../store/user-store';
function Header() {
    const {user} = useUserStore()
    console.log(user);
    const menu = [
        {
            to: '/',
            title: 'Trang chủ'
        },
        {
            to:'/tracuuve',
            title: 'Tra cứu vé'
        },
        {
            to : '/tintuc',
            title: 'Tin tức'
        }
    ]
   const navigate = useNavigate()
    return ( 
        <div id="header" className=" w-full flex justify-between items-center px-5 py-3 text-lg">
            <div className="logo" onClick={()=>{navigate('/')}}>
                <img src={images.logo} alt="Logo" />
            </div>
            <div className="right flex">
                <ul className="list flex gap-3 text-white">
                    {
                        menu.map((li, index)=>{
                            return (<li key={index}>
                                <Link to={li.to}>{li.title}</Link>
                            </li>)
                        })
                    }
                </ul>
                <div className="user ml-5 text-white flex">
                    <div className="icon mr-4">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="username">
                        {user === undefined ? <Link to={'/login'}>Đăng nhập/ Đăng kí</Link> : user?.email}
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Header;