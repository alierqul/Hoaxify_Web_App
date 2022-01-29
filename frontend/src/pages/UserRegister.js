import React, { useState } from "react";
import Input from '../components/input';
import {useTranslation} from 'react-i18next';
import {useApiProgress}from '../shared/ApiProgress';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useDispatch } from "react-redux";
import { registerHandler } from "../redux/authAction";


const UserRegisterPage = props=>{
    const [form,setForm]=useState({
        username:null,
        name:null,
        password:null,
        repassword:null
    });
  
    const dispatch = useDispatch();
    const [errors,setErrors]=useState({ });
 
   const onChangeForm = event =>{       
        const {name,value} =event.target; //object task creation

             setForm(previosForm=>({ ...previosForm, [name]:value}));
             setErrors(previosForm=>({ ...previosForm, [name]:undefined}));
  
    };
  
    //bir cevap bekleme durumu olduğu için async ekledik
    const onClickRegister = async event=>{
        event.preventDefault();//Bu Formun Default değerini görmezden gelmesini istiyoruz. ;Submit olayını biz yazıcaz.
        const {push}=props;
        
       
        const body={
            username:form.username,
            name:form.name,
            password:form.password
        };       

        try{

            await dispatch(registerHandler(body));
            push('/');
        }catch(error){
            if(error.response.data.validationErrors){
            setErrors(error.response.data.validationErrors);
            }
        }
       

       
    };
   

    const {t} =useTranslation();
    const {  username:usernameError,  name:nameError,  password:passwordError} = errors;
    const pendingApiCallRegister = useApiProgress('/api/1.0/users');
    const pendingApiCallLogin = useApiProgress('/api/1.0/auth');
    const pendingApiCall = pendingApiCallRegister|| pendingApiCallLogin;
    let passwordReError;
    if(form.password!==form.repassword){
        passwordReError= t('Password mismatch');
    }
    return(
        <div className="container">
        <form>
            <h1 className="text-center">{t('Sign Up')}</h1>    
            <Input label={t('username')} type="username" error={usernameError} name="username" onChange={onChangeForm} ></Input>

            <Input label={t('Display Name')} error={nameError} name="name" onChange={onChangeForm} ></Input>
           
            <Input label={t('Password')} type="password" error={passwordError} name="password" onChange={onChangeForm} ></Input>

            <Input label= {t('Password Repeat')} type="password" error={passwordReError} name="repassword"onChange={onChangeForm}></Input>

            <ButtonWithProgress 
            text= {t('Sign Up')}
             onClick={onClickRegister} 
             disabled={pendingApiCall || passwordReError!==undefined} 
             pendingApiCall={pendingApiCall}/>
                        
        </form>
        </div>
    );
    
}




export default UserRegisterPage;