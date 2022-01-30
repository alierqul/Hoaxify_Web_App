import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import ProfileImgWithDefault from './ProfileImgWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './input';
import {updateUser} from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
//rsc snippet kısayolu

const ProfileCard = props => {
   const [inEditMode,setInEditMode]=useState(false);
   const [updatedDisplayName,setUpdatedDisplaayName]=useState();
   const routePArams=useParams();
   const [user,setUser]=useState({});
   const [editable,setEditable]=useState(false);
   const {loggedInUsername}=useSelector(store=>({loggedInUsername:store.username}));
   useEffect(()=>{
      setUser(props.user);
   },[props.user]);

   const pathUserName = routePArams.username;
   useEffect(()=>{
     
      setEditable(pathUserName===loggedInUsername);
     
   },[pathUserName,loggedInUsername]);
    
    

    const {username, name, image}=user;
    const {t}=useTranslation();
   
    let message= "We Connot Edit";
    let defaultName=name;

    useEffect(()=>{
     if(!inEditMode){
        setUpdatedDisplaayName(undefined);
     }else{
        setUpdatedDisplaayName(name);
     }
    },[inEditMode,name]);

   const onClickSave=async ()=>{
      const body={
         name:updatedDisplayName
      };
      try{
         const response=await updateUser(username,body);
         setUser(response.data);
         setInEditMode(false);
         
      }catch(error){}
     

   }
      const pendingAPiCall=useApiProgress('put',`/api/1.0/users/${username}`);
   

   

   return(    
     <div className="card text-center">
     <div className='card-header'>
    <ProfileImgWithDefault user={user} size='200'/>
     </div>
        <div className='card-body'>
             {!inEditMode && (
                <div>
               <h3>
                  {name}@{username}
               </h3>
               {
                  editable && (<>
                   <button className='btn btn-success d-inline-flex' onClick={()=>{setInEditMode(true)}}>
                     <span className='material-icons'>edit</span>
                     {t('Edit')}
                  </button>
                  </>)
               }
              
               </div>
            )}

         {inEditMode &&(
            <div className='container'>
               <Input label={t('Change Display Name')} defaultValue={name} onChange={(event)=>{setUpdatedDisplaayName(event.target.value) }}/>

               <div className='container mt-4'>
                 
                  <button className='btn btn-danger d-inline-flex me-2' onClick={()=>{setInEditMode(false)}} disabled={pendingAPiCall} >
                     <span className='material-icons'>close</span>
                     {t('Cancel')}
                  </button>
                 
                 
                  <ButtonWithProgress className='btn btn-primary d-inline-flex me-2' onClick={onClickSave} pendingApiCall={pendingAPiCall} disabled={pendingAPiCall} text= {<>
                     <span className="material-icons">save</span>
                     {t('Save')}</>
                  }/>
                     
                 
               </div>
            </div>
         )

         }   
        </div>     
</div>
   );
  
};

export default ProfileCard;