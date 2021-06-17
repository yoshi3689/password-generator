import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { passwords } from '../API/server';
import { DatePicker } from './DatePicker';

import Input from './Input';



const PasswordEdit = ({ match, setIsUpdated}) => {
    const [passwordToEdit, setPasswordToEdit] = useState({});
    const [password, setPassword] = useState("");
    const [lastModified, setLastModified] = useState(new Date());
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const history = useHistory();

    useEffect(() => {
        
        const getPassword = async () => {
            const { data } = await passwords.get(`/passwords/${match.params.id}`);
            setPasswordToEdit(data);

            //these below are the items to be edited
            setPassword(data.password);
            setTitle(data.title);
            setAuthor(data.author);
        }
        getPassword();
    }, []);
     const editPassword = async (e) => {
        e.preventDefault();
        if(passwordToEdit.password !== password) {
            const { data } = await passwords.patch(`/passwords/${passwordToEdit.id}`,{
                previousPassword: passwordToEdit.password,
                isDirty: true,
                isNew: true,
                lastInteracted: lastModified,
                lastModified, password, title, author,
            });
            console.log(data);
            setIsUpdated(true);
            alert("the password is changed to " + data.password);
            history.push("/passwordList");
        } else {
            alert('your password seems the same as before!')
        }
    }
    return (
        <div className="container">
            <h2 className="header">
                Edit password
            </h2>

            <form onSubmit={(e) => editPassword(e)}>
                <DatePicker label='Date' type="lastModified" value={lastModified} onChange={setLastModified} />

                <Input 
                label="Password" 
                type="text" 
                value={password} 
                onChange={setPassword} />

                <Input 
                label="Title" 
                type="text"  
                value={title} 
                onChange={setTitle}/>

                <Input 
                label="Author" 
                type="text"
                value={author} 
                onChange={setAuthor}/>

            </form>

            <div className="large-button-wrapper">
                <button 
                    onClick={editPassword}
                    className="warning large button" >
                    Save changes
                </button>
                <Link to="/passwordList" className="large button">
                    Go back
                </Link>
            </div>
        </div>
    )
}

export default PasswordEdit;

// useEffect(()=>{
    //     console.log(passwordList.filter(password => password.id == match.params.id));
        
    //     const passwordToEdit = passwordList.filter(password => password.id == match.params.id);
    //     setCurrentPassword(passwordToEdit[0]);
    // }, [])