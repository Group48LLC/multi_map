import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addTerm, clearTerms, clearSearchResults } from '../../redux/map/map.actions';
// import { selectSearchTerms } from '../../redux/map/map.selectors';
import { selectSearchValue1,  selectSearchValue2 } from '../../redux/map/map.selectors';

import './search_box.styles.scss';
import CustomButton from '../custom_button/custom_button.component';
import Checkbox from '../checkbox/checkbox.component';
import FormInput from '../form_input/form_input.component';

const SearchBox = ( {addTerm, clearTerms, clearSearchResults, ...props}) => {
    const handleClick = () => {
        console.log('BUTTON FIRE '+ props.searchValue1 + '---' + props.searchValue2)
        clearTerms();
        clearSearchResults()
        addTerm(props.searchValue1);
        addTerm(props.searchValue2);
    }

    

    return(
    <div className='search-container'>
        <div className='refresh-container'>
            <CustomButton inverted onClick={() => handleClick()}>SEARCH</CustomButton>
            <Checkbox />
        </div>

        <FormInput inputValue/>  

    </div>
    );
}

const mapStateToProps = createStructuredSelector(
    {
        searchValue1: selectSearchValue1,
        searchValue2: selectSearchValue2,
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
       addTerm: (term) => {
          dispatch(addTerm(term))
       },
       clearTerms: () => {
        dispatch(clearTerms())
     },
     clearSearchResults: () => dispatch(clearSearchResults())
    }
 }
 




export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
// export default connect(mapDispatchToProps)(SearchBox);