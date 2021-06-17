import React, { useState, useEffect } from 'react'

import { passwords } from '../API/server';
import Dropdown from './Dropdown';
import Result from './Result';


const List = ({isUpdated}) => {

    const [passwordList, setPasswordList] = useState(null);
    const [currentSort, setCurrentSort] = useState('creationNewest');
    useEffect(() => {
        const getPasswordList = async () => {
            const { data } = await passwords.get('/passwords');
            orderByDate(currentSort, data);
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

        
    const orderByDate = (id, pwsToSort) => {
        let sortedPassword = [...pwsToSort];
        sortedPassword.sort( (item1, item2) => {
            switch(id) {
                case 'creationNewest':
                    // return item2.date - item1.date;
                    return new Date(item2.date) - new Date(item1.date);
                case 'creationOldest':
                    //console.log(new Date(item1.date) - new Date(item2.date));
                    return new Date(item1.date) - new Date(item2.date);
                case 'interactionLatest':
                    console.log('sorting by latest int')
                    return new Date(item2.lastInteracted) - new Date(item1.lastInteracted);
                // case 'mostRecentlyViewed':
                //     return 'mostrecent'

                }
            });  
        //console.log(sortedPassword);
        setPasswordList(sortedPassword);
        setCurrentSort(id);
    }
        
    const renderedPasswordList =  passwordList
    ? passwordList.map((item, index) => {
        return(
            //this clas name has to be modified later as I come up with a better styling for this
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
            <div 
                onClick={(e) => {
                //console.log(e.target);
                orderByDate(e.target.id, passwordList)}
                }>
                <button className="small button" id="creationNewest">
                    <i className="sort numeric down icon"></i>
                </button>
                <button className="small button" id="interactionLatest">
                    <i className="sort numeric down icon"></i>
                    <i className="plus icon"></i>
                </button>
                <button className="small button" id="creationOldest">
                    <i className="sort numeric up icon"></i>
                </button>
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