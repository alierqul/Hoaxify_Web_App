import  { useState,useEffect } from 'react';
import axios from 'axios';

export const useApiProgress = (apiMethod,apiPath)=>{
    const [pendingApiCall,setPendingApiCall]=useState(false);
    useEffect(()=>{
        let requestInterceptor;
        let responseInterceptor;

        const registerInterceptors=()=>{
            //istek gönderildiğinde çalışacak method.  
                            
            requestInterceptor= axios.interceptors.request.use(request=>{     
                const {url, method}= request;     
                updateApiCAllFor(method,url,true);            
                return request;
            })
                
            responseInterceptor= axios.interceptors.response.use(response=>{
                const {url, method}= response.config; 
                updateApiCAllFor(method,url,false);       
                return response;
            },error=>{
                const {url, method}= error.config; 
                updateApiCAllFor(method,url,false);       
                throw error;  
            });
        }

        registerInterceptors();

        const updateApiCAllFor=(method,url,inProgress)=>{

            if(method===apiMethod && url.startsWith(apiPath)){
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
    },[apiPath,apiMethod]);
    return pendingApiCall;
}




