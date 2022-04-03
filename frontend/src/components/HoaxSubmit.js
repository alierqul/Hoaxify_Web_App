import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { postHoax, postHoaxAttachment } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ProfileImgWithDefault from './ProfileImgWithDefault';
import ButtonWithProgress from './ButtonWithProgress';
import AutoUploadImage from './AutoUploadImage';

const HoaxSubmit = () => {
    const {image}=useSelector((store)=>({image:store.image}))
    const [focused,setFocused]=useState(false);
    const [errors,setErrors]=useState({});
    const {t}=useTranslation();
    const [hoax,setHoax]=useState('');
    const [newImage,setNewImage]=useState();
    const [attachmentId,setAttachmentId]=useState();
    useEffect(()=>{
        if(!focused){
            setHoax('');
            setErrors({});
            setNewImage();
            setAttachmentId();
        }
    },[focused])
    useEffect(()=>{
        setErrors(undefined)
    },[hoax]);

    const pendingApiCall=useApiProgress('post','/api/1.0/hoaxes',true);
    const pendingAttachmentsUpload=useApiProgress('post','/api/1.0/hoax-attachments',true);

    const onClickSaveHoax = async() =>{
        try {
            const body={
                content:hoax,
                attachmentId:attachmentId
            }
            await postHoax(body);
            setFocused(false);    
        } catch (error) {
            setErrors(error.response.data.validationErrors);
        }
        
    }

    const changePhotoFile=(event)=>{
        if(event.target.files.length <1){
           return;
        }
        const file = event.target.files[0];
        const fileReader=new FileReader();
        fileReader.onloadend =()=>{
            setNewImage(fileReader.result);
            uploadFile(file);
        };
        fileReader.readAsDataURL(file);
        
     };
     const uploadFile=async(file)=>{
        const attachment=new FormData();
        attachment.append('file',file);
       const response= await postHoaxAttachment(attachment);
        setAttachmentId(response.data.id);

     }
  

    return (
        <div className='card p-1 flex-row'>
            <ProfileImgWithDefault image={image} width="32" height="32" className="rounded-circle me-1"/>
            <div className='flex-fill'>
            <textarea value={hoax}  className={`form-control  ${errors && 'is-invalid'}`} rows={focused ? "3" : "1"} onFocus={()=>{setFocused(true)}}
            onChange={(event)=>{setHoax(event.target.value)}}
            />
            <div className='invalid-feedback'>{errors && errors.content}</div>
            {
                focused && (<>
                 {!newImage &&<input type='file' onChange={changePhotoFile}/>}
                 {newImage &&<AutoUploadImage 
                 newImage={newImage}
                 pendingAttachmentsUpload={pendingAttachmentsUpload}/>
                 }
                <div className='text-end p-2'>
                    <button className='btn btn-light d-inline-flex me-1' 
                     disabled={pendingApiCall || pendingAttachmentsUpload}
                    onClick={()=>{setFocused(false)}}>
                    <span className="material-icons ">close</span> 
                        {t('Cancel')}</button>
                    <ButtonWithProgress 
                    pendingApiCall={pendingApiCall}
                    disabled={pendingApiCall ||pendingAttachmentsUpload}
                    className='btn btn-primary' 
                    onClick={onClickSaveHoax} 
                    text="Hoaxify"
                    />
                    
                </div>
                </>
                   )
            }
            
            </div>
        </div>
    );
};

export default HoaxSubmit;