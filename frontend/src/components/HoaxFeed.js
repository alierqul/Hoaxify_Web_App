import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getHoaxes } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import HoaxView from './HoaxView';
import Spinner from './Spinner';

const HoaxFeed = () => {
    const {t}=useTranslation();
    const [hoaxPage,setHoaxPage] =useState({
        content:[],
        last:true,
        number:0,
    });
    const pendingApiCall=useApiProgress('get','/api/1.0/hoaxes')
    const {content,last,number}=hoaxPage;
    useEffect(()=>{        
        loadHoaxes();
    },[] );

    const loadHoaxes=async(number)=>{
        try {
            const response= await getHoaxes(number);    
            setHoaxPage((h)=>(
                {                    
                    ...response.data,
                    content:[...h.content,...response.data.content]
                    
                }
            ));               
        } catch (error) {
            
        }
    }
   
 if(content.length<1){
    
return(
    <div className='alert alert-danger text-center'>
         {pendingApiCall ?  <Spinner/>:t("There are no hoaxes")}       
    </div>
)
 }else{
    return (
        <div className='container'>
            {
                content.map((hoax,i)=>{
                    return(
                        <div key={hoax.id}>
                            <HoaxView hoax={hoax}/>                        
                        </div>
                    )
                })
            }
        {!last &&
        <div className='alert alert-info text-info text-center'
        style={pendingApiCall ? {cursor:'not-allowed'} :{cursor:'pointer'}}
        onClick={pendingApiCall ? ()=>{}:
            ()=>{loadHoaxes(loadHoaxes(number+1))}}
        >
            {pendingApiCall ?  <Spinner/>:t('Load old hoaxes')}
        </div>
        }
        </div>
    );
 }
   
};

export default HoaxFeed;