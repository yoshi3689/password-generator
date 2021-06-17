import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const rootDiv = document.querySelector('#modal');
const Modal = (props) => {
    useEffect(() => {
        const ourModalDiv = document.createElement('div');
        rootDiv.appendChild(ourModalDiv)

        return(() => {
            rootDiv.removeChild(ourModalDiv);
        })
    }, [])
    return ReactDOM.createPortal(
        <div
            onClick={props.onClick} 
            className="modal-background">
            <div
                onClick={e => e.stopPropagation()} 
                className="modal-container">
                {props.children}
            </div>
        </div>
    
    , rootDiv)
}

export default Modal;