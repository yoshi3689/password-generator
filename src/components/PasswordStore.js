import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { setPasswordStored } from '../actions';
import { SET_PW, SET_MODIFIED_PASSWORD, STORE_PW } from '../constants';
import { passwords } from '../API/server';
import { DatePicker } from './DatePicker';
import Input from './Input';


const PasswordStore = () => {
    
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();
    const newPassword = useSelector(state=> state.newPassword);
    console.log(newPassword);
    
    const storePassword = async e => {
        //this still does not work with onSubmit attribute
        e.preventDefault();
        if(newPassword) {
            const newPasswordConfig = {
                isDirty: false,
                isNew: true,
                lastInteracted: date
            }
            const {data} = await passwords.post('/passwords', {newPassword, date, title, author, ...newPasswordConfig});
            console.log(data);

            dispatch({ type: STORE_PW, payload: data});
            dispatch({ type: SET_MODIFIED_PASSWORD, payload: {...data, type: STORE_PW} });
            alert(data.newPassword + " was saved");
            history.push('/passwordList');
        }
        else {
            alert("create a newPassword first, from storePassword")
        }
    }

    const handleChange = (value) => {
        //console.log(value);
        setDate(value);
    }

    //console.log(date);

    return (
        <div className="container">
            <h2 className="header">
                Store newPassword
            </h2>

            <form onSubmit={(e) => storePassword(e)}>
                <DatePicker label='Date' type="date" value={date} onChange={handleChange} />
                <Input label="Password" type="text" value={newPassword} 
                onChange={''}
                />
                <Input label="Title" type="text" value={title} onChange={setTitle}/>
                <Input label="Author" type="text" value={author} onChange={setAuthor}/>
            </form>

            <div className="large-button-wrapper">
                <button 
                    onClick={storePassword}
                    className="large button" >
                    Store
                </button>
                <Link to="/" className="large button">
                    go back
                </Link>
            </div>
        </div>
    )
}

export default PasswordStore
