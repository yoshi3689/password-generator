import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { passwords } from '../API/server';
import { DatePicker } from './DatePicker';
import Input from './Input';


const PasswordStore = ({ password, setPassword ,setJustUpdated }) => {

    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    // useEffect(() => {
    //     setDate(new Date());
    // })

    const history = useHistory();
    
    const storePassword = async e => {
        //this still does not work with onSubmit attribute
        e.preventDefault();
        if(password) {
            const newPasswordConfig = {
                isDirty: false,
                isNew: true,
                lastInteracted: date
            }
            const {data} = await passwords.post('/passwords', {password, date, title, author, ...newPasswordConfig});
            setJustUpdated(data);
            console.log(data);
            alert(data.password + " was saved");
            history.push('/passwordList');
        }
        else {
            alert("create a password first, from storePassword")
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
                Store password
            </h2>

            <form onSubmit={(e) => storePassword(e)}>
                <DatePicker label='Date' type="date" value={date} onChange={handleChange} />
                <Input label="Password" type="text" value={password} onChange={setPassword}/>
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
