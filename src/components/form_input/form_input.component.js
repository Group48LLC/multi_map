import React from 'react';

import { connect } from 'react-redux';

import './form_input.styles.scss';
 import { setSearchValue1, setSearchValue2, setSearchValue3, setLocationValue } from '../../redux/map/map.actions';
import {  selectLocationValue, selectSearchValue1, selectSearchValue2, selectSearchValue3 } from '../../redux/map/map.selectors';

// import CustomButton from '../custom_button/custom_button.component';
// import Checkbox from '../checkbox/checkbox.component';
// import {addTerm} from '../../redux/map/map.actions';
import { createStructuredSelector } from 'reselect';
// import { selectInputValue } from '../../redux/map/map.selectors';



const FormInput = ( {locationValue, searchValue1, searchValue2, searchValue3, ...props} ) => {

    

    return(
        <div className='form-input'>
            <form onSubmit={() => console.log('suuuuuuubbbbbmmmmiiiit')} >
                <div className='input-with-label' >
                    <label className='label'>Location</label>
                    <div className='input-box'>
                        <input name='location'
                        value={props.locationValue} 
                        onChange={props.inputChangedLocation}
                        />
                    </div>
                </div>
                <div className='input-with-label'>
                    <label >Search 1</label>
                    <div className='input-box'>
                        <input name='term1'
                        value={props.searchValue1} 
                        onChange={props.inputChangedSearchValue1}
                        />
                        <img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        />
                    </div>
                </div>
                <div className='input-with-label'>
                    <label >Search 2</label>
                    <div className='input-box'>
                        <input name='term2'
                        value={props.searchValue2} 
                        onChange={props.inputChangedSearchValue2}
                        />
                        <img src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                        />
                    </div>
                </div>
                <div className='input-with-label'>
                    <label >Search 3</label>
                    <div className='input-box'>
                        <input name='term3'
                        value={props.searchValue3} 
                        onChange={props.inputChangedSearchValue3}
                        />
                        <img src="http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                        />
                    </div>
                </div>

            </form>
            
        </div>
    );
}

const mapStateToProps = createStructuredSelector(
    {
        locationValue: selectLocationValue,
        searchValue1: selectSearchValue1,
        searchValue2: selectSearchValue2,
        searchValue3: selectSearchValue3
    }
);

// const boxHelper = (e) => {
//     const myLength = e.target.value.length;
//             console.log('input--change ', e.target.value);
//             console.log(myLength)
//             if (myLength === 1){
//                 console.log('Create box 2')

//             }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        inputChangedLocation: (e) => {
            console.log('input--change ', e.target.value);
            dispatch(setLocationValue(e.target.value))  
        },
        inputChangedSearchValue1: (e) => {
            //boxHelper(e);
            dispatch(setSearchValue1(e.target.value))
        },
        inputChangedSearchValue2: (e) => {
            //console.log('input--change ', e.target.value);
            dispatch(setSearchValue2(e.target.value))
        },
        inputChangedSearchValue3: (e) => {
            //console.log('input--change ', e.target.value);
            dispatch(setSearchValue3(e.target.value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormInput);