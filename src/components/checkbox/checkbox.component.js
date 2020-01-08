import React from 'react';

import './checkbox.styles.scss';

const Checkbox = ({ props }) => {

    return(
        <div className='checkbox-container'>
            <input className='checkbox-input' type="checkbox" {...props} />
            <span className='label'>Auto</span>
        </div>
        
    );
}

export default Checkbox;