import React,{useState,useEffect} from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useTranslation} from 'react-i18next';
import {useApiProgress} from '../shared/ApiProgress';
import Spinner from '../components/Spinner';

const UserPage = props =>{

    const [user,setUser]=useState({});
    const [notFound,setNotFound]=useState();
    const { username  }= useParams();
    const { t }=useTranslation();

    const pendingApiCall = useApiProgress('get','/api/1.0/users/'+ username);
    
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


    if(pendingApiCall){
        return(
            <Spinner/>
        );
    }

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
    }else
    return (
        <div className="container">
            <ProfileCard user={user}/>
        </div>
    );
};

export default UserPage;