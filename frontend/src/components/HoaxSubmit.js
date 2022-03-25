import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { postHoax } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ProfileImgWithDefault from './ProfileImgWithDefault';
import ButtonWithProgress from './ButtonWithProgress';

const HoaxSubmit = () => {
    const {image}=useSelector((store)=>({image:store.image}))
    const [focused,setFocused]=useState(false);
    const [errors,setErrors]=useState(undefined);
    const {t}=useTranslation();
    const [hoax,setHoax]=useState('');
    useEffect(()=>{
        if(!focused){
            setHoax('');
            setErrors(undefined)
        }
    },[focused])
    useEffect(()=>{
        setErrors(undefined)
    },[hoax]);

    const pendingApiCall=useApiProgress('post','/api/1.0/hoaxes');

    const onClickSaveHoax = async() =>{
        try {
            const body={
                content:hoax
            }
            await postHoax(body);
            setFocused(false);    
        } catch (error) {
            setErrors(error.response.data.validationErrors);
        }
        
    }

    return (
        <div className='card p-1 flex-row'>
            <ProfileImgWithDefault image={image} width="32" height="32" className="rounded-circle me-1"/>
            <div className='flex-fill'>
            <textarea value={hoax}  className={`form-control  ${errors && 'is-invalid'}`} rows={focused ? "3" : "1"} onFocus={()=>{setFocused(true)}}
            onChange={(event)=>{setHoax(event.target.value)}}
            />
            <div className='invalid-feedback'>{errors && errors.content}</div>
            {
                focused && 
                <div className='text-end p-2'>
                    <button className='btn btn-light d-inline-flex me-1' 
                     disabled={pendingApiCall}
                    onClick={()=>{setFocused(false)}}>
                    <span class="material-icons ">close</span> 
                        {t('Cancel')}</button>
                    <ButtonWithProgress 
                    pendingApiCall={pendingApiCall}
                    disabled={pendingApiCall}
                    className='btn btn-primary' 
                    onClick={onClickSaveHoax}
                    text="Hoaxify"
                    />
                    
                </div>
            }
            
            </div>
        </div>
    );
};

export default HoaxSubmit;