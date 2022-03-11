import React from 'react';
import defaultPicture from '../assets/profile.png';

const ProfileImgWithDefault = props => {
  const { image, tempImage } = props;

  let imageSource = defaultPicture;
 if(image){
   imageSource="images/"+image;
 }
  return (
    <img
      alt={`Profile`}
      src={ tempImage || imageSource}
      {...props}
      onError={event => {
        event.target.src = defaultPicture;
      }}
      onError={function (event){
        event.target.src=defaultPicture;
      }}
    />
  );
};

export default ProfileImgWithDefault;
