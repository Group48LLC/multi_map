import React from 'react';

import './search_terms.styles.scss';
import CustomButton from '../custom_button/custom_button.component';
import Checkbox from '../checkbox/checkbox.component';



const SearchTerms = () => {
    
    return(
        <div className='search-container'>
            <div className='refresh-container'>
                <CustomButton inverted>Refresh</CustomButton>
                <Checkbox></Checkbox>
            </div>

        </div>
    );
}

export default SearchTerms;