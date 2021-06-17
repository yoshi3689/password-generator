import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Generator from './Generator';
import List from './List';
import PasswordDelete from './PasswordDelete';
import PasswordEdit from './PasswordEdit';
import PasswordStore from './PasswordStore';


import './App.css';
import Menu from './Menu';

const App = () => {

    const [password, setPassword] = useState("");
    const [isUpdated, setIsUpdated] = useState(null);

    return(
        <div className="wrapper">

            <BrowserRouter>
                <Menu 
                link1="Generator" link2="List" />

                <Route path="/" exact>
                    <Generator 
                        header="password generator" 
                        password={password} 
                        setPassword={setPassword} 
                    />
                </Route>
              
                <Route exact path="/passwordList">
                    <List 
                    header="List"
                    isUpdated={isUpdated} />   
                </Route>

                <Route exact path="/passwordList/store" render={
                    props => <PasswordStore {...props} setIsUpdated={setIsUpdated} password={password} /> 
                } />

                <Route exact path="/passwordList/edit/:id" render={props => 
                    <PasswordEdit 
                        {...props}
                        setIsUpdated={setIsUpdated}/> 
                    } />

                <Route exact path="/passwordList/delete/:id" render={props => <PasswordDelete {...props} setIsUpdated={setIsUpdated}/>
                 } />
            
            </BrowserRouter>
           
        </div>
    );
}

export default App;