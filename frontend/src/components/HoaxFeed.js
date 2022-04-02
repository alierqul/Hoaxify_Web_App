import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getHoaxes, getNewHoaxCount, getNewHoaxes, getOldHoaxes } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import HoaxView from './HoaxView';
import Spinner from './Spinner';

const HoaxFeed = () => {
    const {t}=useTranslation();        
    const {username}=useParams();  
    const [newHoaxCount,setNewHoaxCount]=useState(0); 
    const [hoaxPage,setHoaxPage] =useState({
        content:[],
        last:true,
        number:0,
    });
    const {content,last}=hoaxPage;
    const newHoaxPath = username ? `/api/1.0/users/${username}/hoaxes?page=` : `/api/1.0/hoaxes?page=`;

    const pendingApiCall = useApiProgress('get', newHoaxPath);
    let lastHoaxId=0;    
    let firstHoaxId=0;    
    if(content.length>0){
        const lastHoaxIdx=hoaxPage.content.length-1;
        lastHoaxId=hoaxPage.content[lastHoaxIdx].id;
        firstHoaxId=hoaxPage.content[0].id;
    }
    const pathOldHoax =username ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}` :`/api/1.0/hoaxes/${lastHoaxId}`;
    const loadOldHoaxesPageProgress = useApiProgress('get', pathOldHoax,true);   

    const pathNewHoax =username ? `/api/1.0/users/${username}/hoaxes/${firstHoaxId}` :`/api/1.0/hoaxes/${firstHoaxId}`;
    const loadNewHoaxesPageProgress = useApiProgress('get', `${pathNewHoax}?direction=after`,true);   
    useEffect(()=>{        
        const loadHoaxes=async(number)=>{
            try {
                const response= await getHoaxes(username,number);    
                setHoaxPage((h)=>(
                    {                    
                        ...response.data,
                        content:[...h.content,...response.data.content]
                        
                    }
                ));               
            } catch (error) {
                
            }
        };
        loadHoaxes();
    },[username] );
    
    useEffect(()=>{
        const getCount =async()=>{
          try {
            const response=await getNewHoaxCount(username,firstHoaxId);
           
            setNewHoaxCount(response.data.count);   
                
          } catch (error) {
              
          }
        };
       let looper= setInterval(()=>{
            getCount();
        },5000);
       return ()=>{
           clearInterval(looper);
       }
        
    },[firstHoaxId,username]);

const loadOldHoaxes =async ()=>{
   
    try {
        const response=await getOldHoaxes(username,lastHoaxId);
        setHoaxPage((h)=>(
            {                    
                ...response.data,
                content:[...h.content,...response.data.content]
                
            }
        ));   
    } catch (error) {
        
    }
};

const loadNewHoaxes =async ()=>{
   
    try {
        const response=await getNewHoaxes(username,firstHoaxId);  
        setNewHoaxCount(0);     
        setHoaxPage((h)=>(
            {                    
                ...h,
                content:[...response.data, ...h.content]
                
            }
        ));  
         

    } catch (error) {
        
    }
};
   
 if(content.length===0){    
    return <div className="alert alert-secondary text-center">
        {pendingApiCall ? <Spinner /> : t('There are no hoaxes')}
    </div>;
 }else{
    return (
        <div className='container'>
            {
                newHoaxCount>0 && <div className="alert alert-secondary text-center mb-1"
                style={loadNewHoaxesPageProgress ? {cursor:'not-allowed'} :{cursor:'pointer'}}
                onClick={loadNewHoaxesPageProgress ? () =>{} : () => loadNewHoaxes()}
                >
                
                     {loadNewHoaxesPageProgress ? <Spinner/>:t('There are new hoaxes')}
               
                </div>
            }
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
        style={loadOldHoaxesPageProgress ? {cursor:'not-allowed'} :{cursor:'pointer'}}
        onClick={loadOldHoaxesPageProgress ? () =>{} : () => loadOldHoaxes()}
        >
            {loadOldHoaxesPageProgress ?  <Spinner/>:t('Load old hoaxes')}
        </div>
        }
        </div>
    );
 }
   
};

export default HoaxFeed;