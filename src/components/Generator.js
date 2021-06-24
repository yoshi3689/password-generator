import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Input from './Input';
import { GENERATE, INPUT_NUMBER, INPUT_CHECKBOX, MAX_NUMBER, MIN_NUMBER, SHUFFLE, COPY, SET_PW } from '../constants';

const Generator = ({header}) => {
    const dispatch = useDispatch();
    const newPassword = useSelector(state=> state.newPassword);
    console.log(newPassword);

    const [passwordLength, setPasswordLength] = useState(10);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeLower, setIncludeLower] = useState(true);
    const [includeNumber, setIncludeNumber] = useState(true);
    const [includeSymbol, setIncludeSymbol] = useState(true);

    const generate = e => {
        e.preventDefault();
        const newPassword = 
        GENERATE(
            passwordLength, includeUpper, includeLower, includeNumber, includeSymbol
            );
        if(newPassword) {
            dispatch({ type: SET_PW, payload: newPassword });
        } else {
            alert('could not create a new password');
        }
    };

    const shuffle = () => {
        const shuffledPassword = SHUFFLE(newPassword);
        if(shuffledPassword) {
            dispatch({ type: SET_PW, payload: shuffledPassword });
        }
        else {
            alert('create a password first!');
        }
    }

    const copy = () => {
        COPY(newPassword);
    }

    return(
        <div className="container" >
            <h2 className="header"> 
                {header} 
            </h2> 
            <div className="result-container">
                <h4 className="result">
                    {newPassword}
                </h4>
                <span className="small-button-wrapper">
                    <button 
                        onClick={copy}
                        className="small button">
                        <i className="clipboard icon"/>
                    </button>
                    <button 
                        className="small button"
                        onClick={shuffle}
                        >
                        <i className="random icon" />
                    </button>
                </span>
            </div>

            <form onSubmit={(e) => generate(e)}>
                <Input 
                    label="Length" 
                    type={INPUT_NUMBER} 
                    value={passwordLength}
                    default={passwordLength} 
                    min={MIN_NUMBER} 
                    max={MAX_NUMBER} 
                    onChange={setPasswordLength} />
                <Input label="Uppercase" type={INPUT_CHECKBOX} value={includeUpper} onChange={setIncludeUpper} />
                <Input label="Lowercase" type={INPUT_CHECKBOX} value={includeLower} onChange={setIncludeLower} />
                <Input label="Number" type={INPUT_CHECKBOX} value={includeNumber} onChange={setIncludeNumber} />
                <Input label="Symbol" type={INPUT_CHECKBOX} value={includeSymbol} onChange={setIncludeSymbol} />
            </form>

            <div className="large-button-wrapper"
                onClick={(e) => e.stopPropagation()} >
                <button 
                    className="large button" 
                    onClick={(e) => generate(e)}
                >
                    Generate
                </button>

                {newPassword && 
                <Link to="/passwordList/store" className="proceed large button" >
                    Store
                </Link>
                }
            </div>
        </div>
        
    )
}

export default Generator;