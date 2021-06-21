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
    const [justUpdated, setJustUpdated] = useState(null);

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
              
                <Route exact path="/passwordList"
                    render={
                    props => <List 
                    {...props} 
                    justUpdated={justUpdated}
                    setJustUpdated={setJustUpdated} 
                    password={password} />}   
                />

                <Route exact path="/passwordList/store" render={
                    props => <PasswordStore {...props} setJustUpdated={setJustUpdated} password={password} /> 
                } />

                <Route exact path="/passwordList/edit/:id" render={props => 
                    <PasswordEdit 
                        {...props}
                        setJustUpdated={setJustUpdated}/> 
                    } />

                <Route exact path="/passwordList/delete/:id" render={props => <PasswordDelete {...props} setJustUpdated={setJustUpdated}/>
                 } />
            
            </BrowserRouter>
           
        </div>
    );
}

export default App;