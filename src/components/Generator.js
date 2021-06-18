import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

//import Settings from './Settings';
// import {INPUT_NUMBER, INPUT_CHECKBOX, MAX_NUMBER, MIN_NUMBER} from '../constants';
import Input from './Input';
import Result from './Result';
import { GENERATE, INPUT_NUMBER, INPUT_CHECKBOX, MAX_NUMBER, MIN_NUMBER, SHUFFLE, COPY } from '../constants';

const Generator = ({header, password, setPassword}) => {

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
            setPassword(newPassword);
        } else {
            alert('could not create a new password');
        }
    };

    const shuffle = () => {
        const shuffledPassword = SHUFFLE(password);
        //console.log(shuffledPassword);
        if(shuffledPassword) {
            setPassword(shuffledPassword);
        }
        else {
            alert('create a password first!');
        }
    }

    const copy = () => {
        COPY(password);
    }

    return(
        <div className="container" >
            <h2 className="header"> {header} </h2> 
            {/* <Result
                content={password}
                onBtnClick1={shuffle}
                onBtnClick2={copy}
                iClass1='shuffle'
                iClass2='clipboard'
                >
            </Result> */}

            <div className="result-container">
                <h4 className="result">
                    {password}
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

                {password && 
                <Link to="/passwordList/store" className="proceed large button" >
                    Store
                </Link>
                }
            </div>
        </div>
        
    )
}

export default Generator;