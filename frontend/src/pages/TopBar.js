import React, { useEffect, useRef, useState } from 'react';
import icon from '../assets/icon.png';
import { Link } from 'react-router-dom';
import{ useTranslation} from 'react-i18next';
import {useDispatch,useSelector} from 'react-redux';
import { logOutSuccess } from '../redux/authAction';
import ProfileImgWithDefault from '../components/ProfileImgWithDefault';

const TopBar = props => {
    const { t }=useTranslation();
  
    const { username, isLoggedIn, name, image } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        name: store.name,
        image: store.image
      }));

      const [menuVisible,setMenuVisible] =useState(false);
      useEffect(()=>{
          document.addEventListener('click',menuClickTricker);
          return()=>{
              document.removeEventListener('click',menuClickTricker);
          }
      },[isLoggedIn])
      const menuArea=useRef(null);
      const menuClickTricker = event =>{
          if(!menuArea.current.contains(event.target)){
            setMenuVisible(false);
          }
          
      }
    const dispatch = useDispatch();

    const onLogoutSuccess = () =>{
        
        dispatch(logOutSuccess());
    };
  

       
    let links= (
        <ul className="navbar-nav ms-auto">
            
            <Link className='nav-link' to="/login"><li>{t('Login')}</li></Link>
            <Link className='nav-link' to="/register"> <li>{t('Register')}</li></Link>
        </ul>
    );

    if(isLoggedIn){
       
        links=(
            <ul className="navbar-nav  ms-auto" >
            <li className='nav-item dropdown' >
                <div className='d-flex' style={{cursor:'pointer'}} ref={menuArea} onClick={()=>setMenuVisible(!menuVisible)} >
                    <ProfileImgWithDefault image={image} width="32" height="32" className="rounded-circle m-auto"/>
                    <span className='nav-link dropdown-toggle'> {name}</span>
               </div>
               <div className={`dropdown-menu p-0 shadow ${menuVisible && 'show'} `}>
                    <Link className='dropdown-item d-flex p-2' to={`/user/${username}`}>
                    <span className="material-icons me-2">
                        person
                    </span>
                        <li>{t('My Profile')}</li></Link>                        
                    <span className='dropdown-item d-flex p-2' onClick = {onLogoutSuccess} style={{cursor:'pointer'}}>                    
                    <span class="material-icons d-flex me-2 text-danger">power_settings_new</span>    
                        {t('Logout')}
                    </span>

               </div>
            </li>                            
            </ul>
        );
    };
            
        
    
        return(
            <div className="shadow-sm bg-light mb-2">
            <nav className="navbar navbar-light bg-light navbar-expand">
                <Link className="navbar-link" to="/">
                    <img src={icon} width="60"  className="d-inline-block align-top ms-4 me-4" alt="Hoaxify icon"/>
                    Hoaxify
                </Link>
            {links}
            </nav>
        
            </div>
        );   
   
};



export default TopBar;