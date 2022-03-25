import axios from "axios";

export const registerUser = body =>{
   return axios.post('/api/1.0/users',body);
   
};

export const login = creds => {
   return axios.post('/api/1.0/auth', { },{auth: creds });
 };


 export const getUsers = (page=0,size=3) =>{
   return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
};

export const setAuthorizationHeader = ({isLoggedIn, username, password }) => {
   console.log('isloggednin : '+isLoggedIn);
   if (isLoggedIn) {
     const authorizationHeaderValue = `Basic ${btoa(username + `:` + password)}`;
     axios.defaults.headers['Authorization'] = authorizationHeaderValue;
   } else {
     delete axios.defaults.headers['Authorization'];
   }
 };

 export const getUser= username =>{
   return axios.get(`/api/1.0/users/${username}`);
 };

 export const updateUser= (username,body) =>{
  return axios.put(`/api/1.0/users/${username}`,body);
};
 export const postHoax= (hoax) =>{
  return axios.post(`/api/1.0/hoaxes`,hoax);
};


export const changeLanguage = language => {
   axios.defaults.headers['accept-language'] = language;
 };

