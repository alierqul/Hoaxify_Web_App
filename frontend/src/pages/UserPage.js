import React,{useState,useEffect} from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useTranslation} from 'react-i18next';
import {useApiProgress} from '../shared/ApiProgress';
import Spinner from '../components/Spinner';
import HoaxFeed from '../components/HoaxFeed';
const UserPage = props =>{

    const [user,setUser]=useState({});
    const [notFound,setNotFound]=useState();
    const { username  }= useParams();
    const { t }=useTranslation();

    const pendingApiCall = useApiProgress('get','/api/1.0/users/'+ username,true);
    
    useEffect(() =>{
        const loadUser=async () =>{        
            try{
                const response=await getUser(username);
                setUser(response.data);                
            }catch(error){
                setNotFound(true);
            }
        };
        loadUser();
    },[username]);

    useEffect(() =>{
        setNotFound(false);      
    },[username]);

    if(notFound){
        return (
        <div className='container'>
            <div className="alert alert-danger text-center">
                <div>
                    <span className="material-icons" style={{fontSize:'48px'}}>
                        error
                    </span>
                </div>
            {username} { t('User not found')} 
            </div>
        </div>
        );
    }

    if(pendingApiCall || user.username!==username ){
        return(
            <Spinner/>
        );
    }
    
    return (
        <div className="container">
            <div className='row'>
                <div className='col'>
                    <HoaxFeed/>
                </div>
                <div className='col'>
                    <ProfileCard user={user}/>
                </div>
            </div>
            
        </div>
    );
  

    
};

export default UserPage;