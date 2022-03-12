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
   const {loggedInUsername}=useSelector(store=>({loggedInUsername:store.username}));
   const routePArams=useParams();
   const pathUserName = routePArams.username;
   const [user,setUser]=useState({});
   const [editable,setEditable]=useState(false);
   const [newImage,setNewImage]=useState();
   const [validationErrors,setValidationErrors]=useState({});

   useEffect(()=>{
      setUser(props.user);
   },[props.user]);

   
   useEffect(()=>{
     
      setEditable(pathUserName===loggedInUsername);
     
   },[pathUserName,loggedInUsername]);
    
    

    const {username, name, image}=user;
    const {t}=useTranslation();
   

    useEffect(()=>{
     if(!inEditMode){
        setUpdatedDisplaayName(undefined);
        setNewImage(undefined);
     }else{
        setUpdatedDisplaayName(name);
     }
    },[inEditMode,name]);

    useEffect(()=>{
      setValidationErrors(preValidationErrors=>
        ({
            ...preValidationErrors,
            name:undefined
         })
      )
    },[updatedDisplayName]);

    useEffect(()=>{
      setValidationErrors(preValidationErrors=>
        ({
            ...preValidationErrors,
            image:undefined
         })
      )
    },[newImage]);
   const onClickSave=async ()=>{
      
      let image;
      if(newImage){
         const imageBase64Only = newImage.split(',');
         image=imageBase64Only[1];
      }
      const body={
         name:updatedDisplayName,
         image
      };
      try{
         const response=await updateUser(username,body);
         setUser(response.data);
         setInEditMode(false);
         
      }catch(error){
         setValidationErrors(error.response.data.validationErrors)
      }
     

   }
      const pendingAPiCall=useApiProgress('put',`/api/1.0/users/${username}`);
   
      const changePhotoFile=(event)=>{
         if(event.target.files.length <1){
            return;
         }
         const file = event.target.files[0];
         const fileReader=new FileReader();
         fileReader.onloadend =()=>{
            setNewImage(fileReader.result);
         };
         fileReader.readAsDataURL(file);
      };
   

   return(    
     <div className="card text-center">
     <div className='card-header'>
    <ProfileImgWithDefault 
      className='rounded-circle shadow'    
      width="200" height="200"
      alt={`${username} profile`}
      image={image}
      tempImage={newImage}
     
    />

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
               <div>
               <Input label={t('Change Display Name')} defaultValue={name} 
               onChange={(event)=>{
                  setUpdatedDisplaayName(event.target.value) 
                 
               }}
               error={validationErrors.name}
               />
               </div>
               <div className='float-start mt-2'>
               <Input error={validationErrors.image}  type='file' onChange={changePhotoFile}/>
               </div>
              
               <div className='float-end mt-2'>
                 
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