import React, { useEffect, useState } from 'react'
import  { Link, useHistory } from 'react-router-dom';
import { passwords } from '../API/server';
import Dropdown from './Dropdown';
import Modal from './Modal';

const PasswordDelete = ({ match, setIsUpdated }) => {
    const [passwordToDelete, setPasswordToDelete] = useState(null);
    // const [showModal, setShowModal] = useState(null);
    useEffect(() => {
        const getPassword = async () => {
            const { data } = await passwords.get(`/passwords/${match.params.id}`);
            console.log(data);
            setPasswordToDelete(data)
            // console.log(new Date().getDate())
        }
        getPassword();
    }, []);

    const history = useHistory();

    // password: item.password,
    //                     dateCreated: item.date.slice(0, 10),
    //                     purpose:item.purpose, 
    //                     author:item.author}

    const deletePassword = async() => {
        const { id } = passwordToDelete;
        await passwords.delete(`/passwords/${id}`);
        setIsUpdated(id);
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
