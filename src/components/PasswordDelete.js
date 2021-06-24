import React, { useEffect, useState } from 'react'
import  { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { passwords } from '../API/server';
import Dropdown from './Dropdown';
import Modal from './Modal';
import { SET_MODIFIED_PASSWORD, DELETE_PW } from '../constants';

const PasswordDelete = ({ match }) => {

    const dispatch = useDispatch();
    const [passwordToDelete, setPasswordToDelete] = useState(null);

    useEffect(() => {
        const id = match.params.id;
        const getPassword = async () => {
            const { data } = await passwords.get(`/passwords/${id}`);
            console.log(data);
            setPasswordToDelete({...data, type: DELETE_PW});
        }
        getPassword();
    }, [match.params.id]);

    const history = useHistory();

    // password: item.password,
    //                     dateCreated: item.date.slice(0, 10),
    //                     purpose:item.purpose, 
    //                     author:item.author}

    const deletePassword = async() => {
        const { id } = passwordToDelete;
        await passwords.delete(`/passwords/${id}`);
        dispatch({ type: DELETE_PW, payload: id});
        dispatch({ type: SET_MODIFIED_PASSWORD, payload: passwordToDelete});
        alert("successfully deleted");
        history.push('/passwordList');
    }

    return (
        <Modal onClick={()=>history.push('/passwordList')}>
            <div className="container">
                <Dropdown listProps={passwordToDelete} />
                <div className="large-button-wrapper">
                    <button 
                    className="danger large button" onClick={deletePassword}>
                    Delete password
                    </button>
                
                    <Link 
                    to='/passwordList' className="large button">
                        go back
                    </Link>
                </div>
            </div>

        </Modal>
    );
}

export default PasswordDelete;
