import  { useState,useEffect } from 'react';
import axios from 'axios';

export const useApiProgress = (apiPath)=>{
    const [pendingApiCall,setPendingApiCall]=useState(false);
    useEffect(()=>{
        let requestInterceptor;
        let responseInterceptor;

        const registerInterceptors=()=>{
            //istek gönderildiğinde çalışacak method.  
                            
            requestInterceptor= axios.interceptors.request.use(request=>{           
                updateApiCAllFor(request.url,true);            
                return request;
            })
                
            responseInterceptor= axios.interceptors.response.use(response=>{
                updateApiCAllFor(response.config.url,false);       
                return response;
            },error=>{
                updateApiCAllFor(error.config.url,false);       
                throw error;  
            });
        }

        registerInterceptors();

        const updateApiCAllFor=(url,inProgress)=>{

            if(url.startsWith(apiPath)){
                setPendingApiCall(inProgress);
            }
        }

        const unRegisterInterceptors=()=>{
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.request.eject(responseInterceptor);
        }
        
       
        return function unmount(){
            unRegisterInterceptors();
        }
    },[apiPath]);
    return pendingApiCall;
}




