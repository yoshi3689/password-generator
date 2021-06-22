import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { passwords } from '../API/server';
import { COPY } from '../constants';
import { setModifiedPassword } from '../actions';

const Result = ({ content, onBtnClick1, onBtnClick2, iClass1, iClass2, isNew, id, setJustUpdated, dropdown }) => {

    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false); 
    const [isViewed, setIsViewed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onNewHover = async () => {
        await passwords.patch(`/passwords/${id}`, {isNew: false});
        setIsViewed(true);
    }

    const onItemClick = async () => {
        // let currentTime = new Date();
        const { data } = await passwords.patch(`/passwords/${id}`, { lastClicked: new Date(), lastInteracted: new Date() });
        if(data) {
            //console.log('it is coming')
            setJustUpdated(data);
            dispatch(setModifiedPassword(data));
        }
        //console.log(new Date(data.lastInteracted).getTime(), data.id);
    }

    const onHover = (e) => {
        if(dropdown) {
            setShowDropdown(!showDropdown);

            if(e.type === 'mouseleave') {
                setShowDropdown(false);
                //console.log('it tried to stay open but I cancelled it!');
            if(!isViewed && isNew) {
                onNewHover();
                }
            }

        }
        
    }

    const toggleItem = e => {
        console.log(e.target)
        if(e.target.classList.contains(id) &&  dropdown) {
            const targetDivClasses = document.querySelector(`#result-${e.target.classList[1]}`).classList;
            if(!isOpen) {
                // e.target.classList.add('isOpen');
                targetDivClasses.add('isOpen')
                setIsOpen(true);
                // console.log(targetDivClasses);
            }
            else if(isOpen) {
                // console.log(targetDivClasses);
                targetDivClasses.remove('isOpen')
                setIsOpen(false);    
                // console.log(targetDivClasses);
            }
        onItemClick();
        }
    }

    const rendereBtns = () => {
        if(typeof onBtnClick1 === "string") {
            return(            
                <>
                    <button className="small button" onClick={COPY} >
                        <i className="clipboard icon" ></i>
                    </button>
                    <Link className="small button" to={onBtnClick1}>
                        <i className={`${iClass1} icon`} ></i>
                    </Link>

                    <Link className="small button" to={onBtnClick2}>
                        <i className={`${iClass2} icon`} ></i>
                    </Link>
                </>
                )

        } else {
            return(
                <>
                    <button className="small button" onClick={onBtnClick1} >
                        <i className={`${iClass1} icon`} ></i>
                    </button>
                    <button className="small button" onClick={onBtnClick2} >
                        <i className={`${iClass2} icon`} ></i>
                    </button>
                </>
            )
        }
    }
    return (
        <div 
            // onMouseEnter={ onHover }
            // onMouseLeave={ onHover } 
            onClick={toggleItem}
            className="result-wrapper" 
            id={`result-${id}`}
        >
            <div 
                onMouseEnter={ onHover } 
                onMouseLeave={ onHover }
                className={`result-container ${id}`}
            >
                    <h4 className={`result ${id}`} >
                        {content}
                    </h4>
                    {(isNew && !isViewed)  && <span>new!</span>}
                    <span className="small-button-wrapper">
                        {rendereBtns()}
                    </span>
                    
            </div>
            {(showDropdown || isOpen) && dropdown}
        </div>
    )
}

export default Result
