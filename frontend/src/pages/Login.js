import React, { useEffect, useState } from "react";
import Input from '../components/input';
import {useTranslation} from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import {useDispatch} from 'react-redux';
import { loginHandler } from "../redux/authAction";


const LoginPage = (props) =>{

    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState();
    const dispatch = useDispatch();
    const pendingApiCall = useApiProgress('/api/1.0/auth');
    
    useEffect(()=>{
        setError(undefined);
    },[username,password]  );

    const onClickLogin =async event=>{
        event.preventDefault();//Bu Formun Default değerini görmezden gelmesini istiyoruz. ;Submit olayını biz yazıcaz.

       
        const {history}=props;        
        const {push} =history;

        const creds={
            password,
            username                     
        };

        try{
          await  dispatch(loginHandler(creds));      
          push('/');                      
        }catch(apierror){
           setError(apierror.response.data.message);
        }
     
    };

    const {t}=useTranslation();
  
    const buttonEnabled = username && password;
    return(
        <div className="container">
        <form>
            <h1 className="text-center">{t('Login')}</h1>    
            <Input label={t('username')} type="text"  onChange={event=>setUsername(event.target.value) }></Input>
         
           
            <Input label={t('Password')} type="password"   onChange={event=>setPassword(event.target.value) }></Input>

            { 
            error && <div className="alert alert-danger" role="alert" >
            {t('Check your Password or Password.')}
            </div>
            }

           
            <ButtonWithProgress text= {t('Login')} onClick={onClickLogin} disabled={!buttonEnabled || pendingApiCall} pendingApiCall={pendingApiCall}/>
           
         
                       
        </form>
        </div>
    );
    
}



export default LoginPage;