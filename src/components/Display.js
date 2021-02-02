import React from 'react';
import './Display.css';

const Display = (props) => {
   
    return (
        <div className={`row ${props.theme==="dark"?'calculator-display_dark':'calculator-display_light'}`}>
            <div className={`${props.theme==="dark"?'display-digits_dark':'display-digits_light'}`}>{props.children}</div>
            
        </div>
    )
}
export default Display;