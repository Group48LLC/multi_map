import React from 'react';

import { connect } from 'react-redux';

import './form_input.styles.scss';
 import { setSearchValue1, setSearchValue2, setLocationValue } from '../../redux/map/map.actions';
import {  selectLocationValue, selectSearchValue1, selectSearchValue2 } from '../../redux/map/map.selectors';

// import CustomButton from '../custom_button/custom_button.component';
// import Checkbox from '../checkbox/checkbox.component';
// import {addTerm} from '../../redux/map/map.actions';
import { createStructuredSelector } from 'reselect';
// import { selectInputValue } from '../../redux/map/map.selectors';



const FormInput = ( {locationValue,searchValue1, searchValue2, ...props} ) => {

    const handleSubmit = () => {
        console.log('submit happening')
    }

    return(
        <div className='form-input'>
            <form onSubmit={handleSubmit} >
                <div className='input-with-label'>
                    <label className='label'>Location</label>
                    <input name='location' 
                    value={props.locationValue} 
                    onChange={props.inputChangedLocation}
                    />
                </div>
                <div className='input-with-label'>
                    <label >Search</label>
                    <input name='term1' 
                    className='term1-input'
                    value={props.searchValue1} 
                    onChange={props.inputChangedSearchValue1}
                    /> 
                </div>
                <div className='input-with-label'>
                    <label >Search</label>
                    <input name='term2' 
                    className='term2-input'
                    value={props.searchValue2} 
                    onChange={props.inputChangedSearchValue2}
                    />
                </div>
            </form>
            
        </div>
    );
}

const mapStateToProps = createStructuredSelector(
    {
        locationValue: selectLocationValue,
        searchValue1: selectSearchValue1,
        searchValue2: selectSearchValue2
    }
);

const boxHelper = (e) => {
    const myLength = e.target.value.length;
            console.log('input--change ', e.target.value);
            console.log(myLength)
            if (myLength === 1){
                console.log('Create box 2')

            }
}

const mapDispatchToProps = (dispatch) => {
    return {
        inputChangedLocation: (e) => {
            console.log('input--change ', e.target.value);
            dispatch(setLocationValue(e.target.value))  
        },
        inputChangedSearchValue1: (e) => {
            boxHelper(e);
            dispatch(setSearchValue1(e.target.value))
        },
        inputChangedSearchValue2: (e) => {
            console.log('input--change ', e.target.value);
            dispatch(setSearchValue2(e.target.value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormInput);