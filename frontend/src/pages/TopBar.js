import React from 'react';
import icon from '../assets/icon.png';
import { Link } from 'react-router-dom';
import{ useTranslation} from 'react-i18next';
import {useDispatch,useSelector} from 'react-redux';
import { logOutSuccess } from '../redux/authAction';


const TopBar = props => {
    const { t }=useTranslation();
  
    const { username, isLoggedIn, name, image } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        name: store.displayName,
        image: store.image
      }));

    const dispatch = useDispatch();

    const onLogoutSuccess = () =>{
        
        dispatch(logOutSuccess());
    };
  

       
    let links= (
        <ul className="navbar-nav me-4 ms-auto">
            <Link className='nav-link' to="/login"><li>{t('Login')}</li></Link>
            <Link className='nav-link' to="/register"> <li>{t('Register')}</li></Link>
        </ul>
    );

    if(isLoggedIn){
        links=(
            <ul className="navbar-nav me-4 ms-auto">
            <Link className='nav-link' to={`/user/${username}`}><li>{username}</li></Link>
            <li className='nav-link' onClick = {onLogoutSuccess} style={{cursor:'pointer'}}>{t('Logout')}</li>
            
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