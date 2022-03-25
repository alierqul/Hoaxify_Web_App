import React from 'react';
import { useSelector } from 'react-redux';
import HoaxFeed from '../components/HoaxFeed';
import HoaxSubmit from '../components/HoaxSubmit';
import UserList from '../components/UserList';



const HomePage = props => {
  const{isLoggedIn}=useSelector((store)=>({isLoggedIn:store.isLoggedIn}))
    return (
      <div className='container'>
      <div className='row'>
        {
        isLoggedIn &&
        <div className='col-6 col-md-8'>
          <div className='mb-3'>
          <HoaxSubmit/>
          </div>
          <HoaxFeed/>
        </div>
        }
        <div className='col-6 col-md-4'>
        <UserList/>
        </div>
      </div>
      </div>
           
       
    );
};

export default HomePage;