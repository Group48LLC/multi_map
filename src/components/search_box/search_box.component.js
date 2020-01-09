import React from 'react';

import './search_box.styles.scss';
import CustomButton from '../custom_button/custom_button.component';
import Checkbox from '../checkbox/checkbox.component';
import FormInput from '../form_input/form_input.component';



const SearchBox = () => {
    
    return(
        <div className='search-container'>
            <div className='refresh-container'>
                <CustomButton inverted>Refresh</CustomButton>
                <Checkbox></Checkbox>
            </div>
            <FormInput label='Location' />
            <FormInput label='Search Item' />
        </div>
    );
}

export default SearchBox;