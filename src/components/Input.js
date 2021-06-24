import React from 'react';

const Input = (props) => {

    const renderedInput = type => {
        switch(type) {
            case 'number':
                return(
                    <input 
                        type={type} 
                        defaultValue={props.default}
                        min={props.min} 
                        max={props.max} 
                        onChange={(e) => props.onChange(e.target.value)} 
                    />
                )
            case 'checkbox':
                return(
                    <input 
                        type={type}
                        defaultChecked={props.value} 
                        onChange={(e) => {props.onChange(e.target.checked)}} 
                    />
                )
            case 'text' :
                return(
                    <input 
                        type={type}
                        // defaultValue={props.defaultValue}
                        value={props.value} 
                        name={props.label.toLowerCase()}
                        onChange={(e) => props.onChange(e.target.value)} 
                    />
                )
            default: 
            return null;
        }

    }

    // props.type === 'number' 
    // ?

    // :
    // ;

    return(
        <div 
            className="setting" 
            //style={style}
            >
            <label> {props.label} </label>
            {renderedInput(props.type)}
        </div>
    )
}

export default Input;