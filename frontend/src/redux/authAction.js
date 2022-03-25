import { login, registerUser } from "../api/apiCalls";
import * as ACTIONS from "./Constants";

export const logOutSuccess =()=>{
   return {
        type:ACTIONS.LOGOUT_SUCCESS
    };
};

export const loginSuccess =(authState)=>{
    return {
         type:ACTIONS.LOGIN_SUCCESS,
        payload:authState
       

     };
 };
export const updateSuccess =(payload)=>{
    return {
         type:ACTIONS.UPDATE_SUCCESS,
         payload
       

     };
 };

 export const loginHandler=(credentials)=>{
     return async (dispatch)=>{
         const response= await login(credentials);  
         const authState ={
             ...response.data,               
             password :credentials.password        
         };
     
         dispatch(loginSuccess(authState));

         return response;
     }
 };

 export const registerHandler= user =>{

    return async (dispatch)=>{
        const response= await registerUser(user);
        await dispatch(loginHandler(user));
        return response;
    };

 };