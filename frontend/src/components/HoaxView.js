import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImgWithDefault from './ProfileImgWithDefault';
import {format} from 'timeago.js';
import { useTranslation } from 'react-i18next';
const HoaxView = (props) => {
    const{hoax}=props;
    const{user,content,timestamp,id}=hoax;
    const{name,username,image}=user;
    const{i18n}=useTranslation();
    const formated= format(timestamp,i18n.language);

    return (
        <div className='card p-1 mb-2'> 
        <div className='d-flex'>
            <ProfileImgWithDefault 
            image={image} 
            width="32" height="32" 
            className="rounded-circle"/>
            <div className='flex-fill-end ms-auto'>
            <Link className='text-dark' to={`/user/${username}`}>
            <h6 >{name}@{username}</h6>              
            </Link>
            </div>
        </div>
        <div className='flex-fill ps-5'>
            {content} -[{id}]                       
        </div>
        <span className='ms-auto'>{formated}</span>    
        </div>
    );
};

export default HoaxView;