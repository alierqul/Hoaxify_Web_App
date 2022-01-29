import React from 'react';
import defaultProfileIcon from '../assets/profile.png';

const ProfileImgWithDefault = props => {
    const {user,size} = props;
    const {username, image} = user;

    let imageSource=defaultProfileIcon;
    if(image){
     imageSource=image;
     }

    return (
        <img className='rounded-circle me-4 shadow'
        width={size}
        height={size}

        alt={`${username} profile`} 
        src={imageSource} 
        
        /> 
    );
};

export default ProfileImgWithDefault;