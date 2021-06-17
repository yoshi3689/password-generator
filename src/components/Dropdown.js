import React from 'react'

const Dropdown = ({ listProps }) => {
    //console.log(listProps)

    const renderedLIs = listProps &&
    Object.entries(listProps).map((pair, index) => {

            if(typeof pair[1] === 'string' ) {
                if(pair[0].indexOf('date') < 0 || pair[0].indexOf('last') < 0) pair[1] = pair[1].slice(0, 10);

                return(
                    <li key={index} className="setting">
                        <label>
                            {pair[0]}
                        </label>
                        <span>
                            {pair[1]}
                        </span>
                    </li>
                )
            }
            return null;
        })

    return (
        <ul className="dropdown" >
            {renderedLIs}
        </ul>
    )
}

export default Dropdown;
