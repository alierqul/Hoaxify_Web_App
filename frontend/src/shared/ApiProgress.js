import  { useState,useEffect } from 'react';
import axios from 'axios';

export const useApiProgress = (apiMethod,apiPath,strictPath)=>{
    const [pendingApiCall,setPendingApiCall]=useState(false);

    useEffect(()=>{
        let requestInterceptor;
        let responseInterceptor;

        const updateApiCAllFor=(method,url,inProgress)=>{
            if(method !== apiMethod){
                return;
            }

            if(strictPath && url === apiPath){
                setPendingApiCall(inProgress);
            }else if(!strictPath && url.startsWith(apiPath)){
                setPendingApiCall(inProgress);
            }
        } ;      

        const registerInterceptors= () =>{
            //istek gönderildiğinde çalışacak method.  
            
            requestInterceptor= axios.interceptors.request.use(request=>{     
                const {url, method}= request;     
                updateApiCAllFor(method,url,true);            
                return request;
            });
                
            responseInterceptor= axios.interceptors.response.use( response =>{
                const {url, method}= response.config; 
                updateApiCAllFor(method,url,false);       
                return response;
            },error =>{
                const {url, method}= error.config; 
                updateApiCAllFor(method,url,false);       
                throw error;  
            });
        };

        const unRegisterInterceptors=()=>{
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }

        registerInterceptors();  
       
        return function unmount(){
            unRegisterInterceptors();
        };
    },[apiPath,apiMethod,strictPath]);
    
    return pendingApiCall;
};




