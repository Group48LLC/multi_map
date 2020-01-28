import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addTerm, clearTerms, clearSearchResults ,setSearchFlag, addLocationValue, clearSearchResultId, clearSearchResultsDetails} from '../../redux/map/map.actions';
// import { selectSearchTerms } from '../../redux/map/map.selectors';
import { selectSearchValue1,  selectSearchValue2, selectSearchValue3, selectLocationValue, selectLocationList } from '../../redux/map/map.selectors';

import './search_box.styles.scss';
import CustomButton from '../custom_button/custom_button.component';
import FormInput from '../form_input/form_input.component';

const SearchBox = ( {addLocationValue, clearSearchResultId, locationValue, locationList, addTerm, clearTerms, clearSearchResults, setSearchFlag, ...props}) => {
    

    
    const handleClick = () => {
        console.log('FIRE ===> SEARCH BUTTON --'+ props.searchValue1 + '---' + props.searchValue2 + '---' + props.searchValue3)
        clearTerms();
        clearSearchResults();
        clearSearchResultId();
        clearSearchResultsDetails();
        console.log('Location_ValueTO_pass== ' + locationValue)
        addLocationValue(locationValue)
        console.log('Location_List ==' + locationList)
        addTerm(props.searchValue1);
        addTerm(props.searchValue2);
        addTerm(props.searchValue3);
        setSearchFlag(1);
    }

    

    return(
    <div className='search-container'>
        
        <FormInput inputValue/> 
        
        <div className='refresh-container'>
            <CustomButton inverted onClick={() => handleClick()}>SEARCH</CustomButton>
        </div>


    </div>
    );
}

const mapStateToProps = createStructuredSelector(
    {
        searchValue1: selectSearchValue1,
        searchValue2: selectSearchValue2,
        searchValue3: selectSearchValue3,
        locationValue: selectLocationValue,
        locationList: selectLocationList
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        addTerm: (term) => dispatch(addTerm(term)),
        clearTerms: () => dispatch(clearTerms()),
        clearSearchResults: () => dispatch(clearSearchResults()),
        setSearchFlag: (term) => dispatch(setSearchFlag(term)),
        addLocationValue: (location) => dispatch(addLocationValue(location)),
        clearSearchResultId: () => dispatch(clearSearchResultId()),
        clearSearchResultsDetails: () => dispatch(clearSearchResultsDetails())
        
    }//return
 }
 




export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
// export default connect(mapDispatchToProps)(SearchBox);