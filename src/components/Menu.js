import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ link1, link2 }) => {
    return (
        <div className="header-wrapper">
            <Link className="link" to="/"> {link1} </Link>
            <Link className="link" to="/passwordList"> {link2} </Link>
        </div>
    )
}

export default Menu;
