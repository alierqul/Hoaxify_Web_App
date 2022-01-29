import React, { Component }from 'react';
import {getMyTodoList} from '../api/apiCalls'; 
import Input from '../components/input';
import {withTranslation} from 'react-i18next';
class HomePage extends Component {
    state={
        username:null
          
    };
    onLoadChange= event =>{
        const{username}=this.state;
        try{
            //await getMyTodoList(username);
        }catch(error){

        }
    };
    
    render(){       
        const{t,username}=this.props;
        this.setState({username});
        return (
            <div class="container px-4" onLoad={this.onLoadChange}> 
                
                <h5 className="card-title"> {t('Buğün ne yapmalı?')} </h5>
                <Input type="text" name="todo" ></Input>
               <h5 className="card-title mt-4"> Daha Önce Eklenen</h5>
               <ul className="list-group-flush mt-4" >
                    <li className="list-group-item">
                           <div className="form-check"> <label class="form-check-label"> <input className="checkbox" type="checkbox"/> For what reason would it be advisable. <i class="input-helper"></i></label> </div> <i class="remove mdi mdi-close-circle-outline"></i>
                       </li>
                       <li className="list-group-item">
                           <div className="form-check"> <label class="form-check-label"> <input className="checkbox" type="checkbox"/> For what reason would it be advisable. <i class="input-helper"></i></label> </div> <i class="remove mdi mdi-close-circle-outline"></i>
                      </li>
                               
                </ul>
            </div>
        );
    };
}
export default withTranslation()(HomePage);