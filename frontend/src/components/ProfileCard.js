import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import ProfileImgWithDefault from './ProfileImgWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './input';
//rsc snippet kısayolu

const ProfileCard = props => {
   const [inEditMode,setInEditMode]=useState(false);
   const [updatedDisplayName,setUpdatedDisplaayName]=useState();
   const routePArams=useParams();
    const pathUserName = routePArams.username;
    const {user} =props;
    const {username, name, image}=user;
    const {t}=useTranslation();
    const {loggedInUsername}=useSelector(store=>({loggedInUsername:store.username}));
    let message= "We Connot Edit";
    let defaultName=name;

    useEffect(()=>{
     if(!inEditMode){
        setUpdatedDisplaayName(undefined);
     }else{
        setUpdatedDisplaayName(name);
     }
    },[inEditMode,name]);

   const onClickSave= ()=>{
      console.log(updatedDisplayName);
   }

    if(pathUserName===loggedInUsername){
        message="we can edit";
    };

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
               <button className='btn btn-success d-inline-flex' onClick={()=>{setInEditMode(true)}}>
                  <span className='material-icons'>edit</span>
                  {t('Edit')}
               </button>
               </div>
            )}

         {inEditMode &&(
            <div>
               <Input label={t('Change Display Name')} defaultValue={name} onChange={(event)=>{setUpdatedDisplaayName(event.target.value) }}/>

               <div className='container mt-4'>
                  <button className='btn btn-danger d-inline-flex me-2' onClick={()=>{setInEditMode(false)}} >
                     <span className='material-icons'>close</span>
                     {t('Cancel')}
                  </button>
                  <button className='btn btn-success d-inline-flex' onClick={onClickSave} >
                  <span className="material-icons">save</span>
                     {t('Save')}
                  </button>
               </div>
            </div>
         )

         }   
        </div>     
</div>
   );
  
};

export default ProfileCard;