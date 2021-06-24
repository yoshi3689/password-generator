import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Generator from './Generator';
import List from './List';
import PasswordDelete from './PasswordDelete';
import PasswordEdit from './PasswordEdit';
import PasswordStore from './PasswordStore';


import './App.css';
import Menu from './Menu';

const App = () => {

    return(
        <div className="wrapper">

            <BrowserRouter>
                <Menu 
                link1="Generator" link2="List" />

                <Route path="/" exact>
                    <Generator 
                        header="password generator"  
                    />
                </Route>
              
                <Route exact path="/passwordList" component={List} 
                />

                <Route exact path="/passwordList/store" component={PasswordStore}/>

                <Route exact path="/passwordList/edit/:id" component={PasswordEdit} 
                />

                <Route exact path="/passwordList/delete/:id" component={PasswordDelete} />
            
            </BrowserRouter>
        </div>
    );
}

export default App;