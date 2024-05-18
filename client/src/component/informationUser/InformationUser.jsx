import { useEffect, useState } from 'react';
import './informationUser.scss'
import { useInformationStore } from '../../store/information-user-store';
function InformationUser( {formInformation, sendData}) {
    const {name, email, phoneNumber , handleChanges} = useInformationStore()
    const handleChange = (e)=>{
        // setData({...data, [e.target.name]: e.target.value})
        // sendData(data)
        handleChanges({[e.target.name] : e.target.value})
    }
    return ( 
        <div className="div information-user grid grid-cols-12 mt-3 gap-3 py-5">
            <div className="col-span-8  flex justify-end">
                <div className='w-11/12  bg-white px-4 py-6 rounded-xl'>
                    <div className="title-information font-bold ">Thông tin khách hàng</div>
                    {
                        formInformation.map((form, index)=>{
                            return (
                                <div className="form-item" key={index}>
                                    <label className="mt-2 block label-form" htmlFor="">{form.label}</label>
                                    <input onInput={(e)=>handleChange(e)}  name={form.key} type="text"  className="w-full px-3 py-2 mt-2 input-form" placeholder= {form.label} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="col-span-4"></div>
        </div>
     );
}

export default InformationUser;