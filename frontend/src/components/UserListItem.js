import React from 'react';
import {Link} from 'react-router-dom';
import ProfileImgWithDefault from './ProfileImgWithDefault';
const UserListItem = (props) => {
    const {user} =props;
    const {username,name,image} =user;
   
    return (    
                    <Link to={`/user/${username}`} className='list-group-item list-group-item-action' >
                        <ProfileImgWithDefault user={user} size='32'/>
                        <span className='pl-2'>
                            {username}@{name}
                        </span>
                    </Link>                                                            
            
    );
};

export default UserListItem;