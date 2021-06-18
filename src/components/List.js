import React, { useState, useEffect } from 'react'

import { passwords } from '../API/server';
import Dropdown from './Dropdown';
import Result from './Result';


const CREATION_NEWEST = 'CREATION_NEWEST';
const CREATION_OLDEST = 'CREATION_OLDEST';
const INTERACTION_LATEST = 'INTERACTION_LATEST';  

const List = ({isUpdated}) => {

    const [passwordList, setPasswordList] = useState(null);
    const [currentSort, setCurrentSort] = useState(CREATION_OLDEST);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const getPasswordList = async () => {
            const { data } = await passwords.get('/passwords');
            //orderByDate(currentSort, data);
            setPasswordList(data);
        }
        getPasswordList();
    }, [isUpdated]);
        // const getPasswordList = async () => {
        //     const {data} = await passwords.get('/passwords');
        //     data.map(item => {
        //         return(
        //             <div>
        //                 {item.password}
        //             </div>
        //         )
        //     })
        // }

        
    const orderByDate = (eleCLicked, pwsToSort) => {
        console.log(eleCLicked)
        const id = eleCLicked.id ? eleCLicked.id : eleCLicked.parentElement.id;
        let sortedPassword = [...pwsToSort];
        sortedPassword.sort( (item1, item2) => {
            switch(id) {
                case CREATION_NEWEST:
                    return new Date(item2.date) - new Date(item1.date);
                case {CREATION_OLDEST}:
                    return new Date(item1.date) - new Date(item2.date);
                case {INTERACTION_LATEST}:
                    return new Date(item2.lastInteracted) - new Date(item1.lastInteracted);

                }
            });  
        setPasswordList(sortedPassword);
        setCurrentSort(id);
    }
        
    const renderedPasswordList =  passwordList
    ? passwordList.map((item, index) => {
        return(
            <Result 
                key={index}
                content={item.title}
                onBtnClick1={`passwordList/delete/${item.id}`}
                onBtnClick2={`passwordList/edit/${item.id}`}
                iClass1='x'
                iClass2='edit'
                isNew={item.isNew}
                id={item.id}
                dropdown={
                <Dropdown 
                    listProps={{
                        password: item.password,
                        dateCreated: item.date.slice(0, 10),
                        author:item.author}
                    } 
                />}
                >
            </Result>

        )
        
    })
    : (
        <div>
            No passwords avilable!
        </div>
    )
    ;

    // const renderAdditionalInfo = () => {
    //     return(

    //     )
    // }

    return (
        <div className="container">
            <h2 className="header">
                password list
            </h2>
            <div className="result-container">
            <h3 onClick={() => setIsOpen(!isOpen)} >
                Sort By :{currentSort.toLocaleLowerCase().replace('_', ' ')}
                { !isOpen && <i className="arrow down icon"></i> } 
            </h3> 
            {isOpen && 
                <div 
                    onClick={(e) => {
                    //console.log(e.target);
                    orderByDate(e.target, passwordList)}
                }>
                    <button className="small button" id={CREATION_NEWEST}>
                        <i className="sort numeric down icon"></i>
                        creation date
                    </button>
                    <button className="small button" id={INTERACTION_LATEST}>
                        <i className="sort numeric down icon"></i>
                        date interacted
                    </button>
                    <button className="small button" id={CREATION_OLDEST}>
                        <i className="sort numeric up icon"></i>
                        creation date
                    </button>
                </div>
            }
            </div>

            <div className="list-wrapper" >
                {renderedPasswordList}
            </div>
        </div>
    )
}

export default List;

// <div className="setting" key={passwordItem.id} >
//                 <span> 
//                     {passwordItem.id} : {passwordItem.password} 
//                 </span>

//                 <span >
//                     <Link className="small button" to={`passwordList/delete/${passwordItem.id}`}>
//                         <i className="x icon"></i>
//                     </Link>

//                     <Link className="small button" to={`passwordList/edit/${passwordItem.id}`}>
//                         <i className="edit icon"></i>
//                     </Link>
//                 </span>

//             </div>

//     const renderPasswords = () => { passwordList.map(passwordItem => {
    //         return(
    //             <div>
    //                 {passwordItem.password}
    //             </div>
    //         )
    //     }) 
    // }