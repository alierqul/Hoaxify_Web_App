import React from 'react';
import './AutoUploadImage.css';
const AutoUploadImage = ({pendingAttachmentsUpload,newImage}) => {
    
    return (
      <div  style={{ position: "relative" }}>
        <img className="img-thumbnail" src={newImage} alt="hoax-attackment" />
        <div className="overlay" style={{opacity:pendingAttachmentsUpload ? 1: 0}}>
          <div className="d-flex justify-content-center h-100">
            <div className="spinner-border text-light m-auto" >
              <span className="sr-only"></span>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AutoUploadImage;