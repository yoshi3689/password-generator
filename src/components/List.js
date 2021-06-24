import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { passwords } from '../API/server';
import Dropdown from './Dropdown';
import Result from './Result';

import { SET_PL  } from "../constants";


//import { fetchPasswordList } from '../actions';


const CREATION_NEWEST = 'CREATION_NEWEST';
const CREATION_OLDEST = 'CREATION_OLDEST';
const INTERACTION_LATEST = 'INTERACTION_LATEST';  

const List = () => {
    const passwordList = useSelector(state => state.passwordList && Object.values(state.passwordList));

    const modifiedPassword = useSelector(state => state.modifiedPassword)
    const dispatch = useDispatch();
    console.log(modifiedPassword, passwordList);

    const [currentSort, setCurrentSort] = useState('');
    const [sortedPL, setSortedPL] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
         const getPasswordList = async () => {
            const { data } = await passwords.get('/passwords');
            dispatch({ type: SET_PL, payload: data });
        }
        getPasswordList();
    }, [modifiedPassword, dispatch]);
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
        const id = eleCLicked.id ? eleCLicked.id : eleCLicked.parentElement.id;
        let pLToSort = [...pwsToSort];
        pLToSort.sort( (item1, item2) => {
            switch(id) {
                case CREATION_NEWEST:
                    console.log(id)
                    return new Date(item2.date) - new Date(item1.date);
                case CREATION_OLDEST:
                    console.log(id)
                    return new Date(item1.date) - new Date(item2.date);
                case INTERACTION_LATEST:
                    console.log(id)
                    return new Date(item2.lastInteracted) - new Date(item1.lastInteracted);
                default:
                    return item1.date - item2.date;
                }
            });  
        setSortedPL(pLToSort);
        setCurrentSort(id);
        setIsOpen(false);
    }
        
    const renderedPasswordList = passwordList 
    ? passwordList.map( (item, index) => {
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
        : (<div> No passwords avilable! </div>);
    // if(sortedPL) {
    //     sortedPL.map((item, index) => {
    //         return(
    //             <Result 
    //                 key={index}
    //                 content={item.title}
    //                 onBtnClick1={`passwordList/delete/${item.id}`}
    //                 onBtnClick2={`passwordList/edit/${item.id}`}
    //                 iClass1='x'
    //                 iClass2='edit'
    //                 isNew={item.isNew}
    //                 id={item.id}
    //                 dropdown={
    //                 <Dropdown 
    //                     listProps={{
    //                         password: item.password,
    //                         dateCreated: item.date.slice(0, 10),
    //                         author:item.author}
    //                     } 
    //                 />}
    //                 >
    //             </Result>
    
    //         )
    //                 }
        
    // else if(passwordList) {
    //     passwordList.map((item, index) => {
    //         return(
    //             <Result 
    //                 key={index}
    //                 content={item.title}
    //                 onBtnClick1={`passwordList/delete/${item.id}`}
    //                 onBtnClick2={`passwordList/edit/${item.id}`}
    //                 iClass1='x'
    //                 iClass2='edit'
    //                 isNew={item.isNew}
    //                 id={item.id}
    //                 dropdown={
    //                 <Dropdown 
    //                     listProps={{
    //                         password: item.password,
    //                         dateCreated: item.date.slice(0, 10),
    //                         author:item.author}
    //                     } 
    //                 />}
    //                 >
    //             </Result>
    
    //         )
    // } return <div> No passwords avilable! </div>;
    
    

    return (
        <div className="container list">
            <h2 className="header">
                password list
            </h2>
            <div className="result-container">
            <h3 onClick={() => setIsOpen(!isOpen)} >
                Sort By : {currentSort.toLocaleLowerCase().replace('_', ' ')}
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