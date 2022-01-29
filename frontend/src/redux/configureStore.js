import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import SecureLS from 'secure-ls';
import authreducer from './authReducer';
import { setAuthorizationHeader } from '../api/apiCalls';

const secureLS = new SecureLS();

const getStateFromStorage= () =>{
  const activeAuth= secureLS.get('active-auth');
  let stateInLocalStorage={
    isLoggedIn:false,
    username:undefined,
    name: undefined,
    image:undefined,
    password:undefined
  };
  if(activeAuth){
         stateInLocalStorage=activeAuth; 
  }
  
  return stateInLocalStorage;
};

const updateStateInStorage= newState =>{
   //Local Stroge KEy:String value:String şeklinde active user bilgilerini not alıyoruz. 
   secureLS.set('active-auth',newState);


}

  const configureStore = () =>{
    const initialState = getStateFromStorage();
    setAuthorizationHeader(initialState);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;      
    const store = createStore(authreducer, initialState, composeEnhancers(applyMiddleware(thunk)));

      store.subscribe( ()=>{
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
      });
      
      return store;
  }

  export default configureStore;
