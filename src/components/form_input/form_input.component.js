import React from 'react';

import { connect } from 'react-redux';

import './form_input.styles.scss';
 import { setSearchValue1, setSearchValue2, setSearchValue3, setLocationValue } from '../../redux/map/map.actions';
import {  selectLocationValue, selectSearchValue1, selectSearchValue2, selectSearchValue3 } from '../../redux/map/map.selectors';

import { createStructuredSelector } from 'reselect';
import TextField from '@material-ui/core/TextField'
import { ReactComponent as CityIcon} from '../../assets/location_city.svg'; 




const FormInput = ( {locationValue, searchValue1, searchValue2, searchValue3, ...props} ) => {

    const handleSubmit = () => {
        console.log('submit happening')
    }

    return(
        <div className='form-input'>
            <form onSubmit={handleSubmit} >
                <div className='input-container'>
                    <CityIcon className='city-icon' />
                    <TextField 
                        label="Location or City"
                        name='location' 
                        value={props.locationValue} 
                        onChange={props.inputChangedLocation}
                        placeholder="austin"
                    />
                </div>
                <div className='input-container'>
                    <img src='http://maps.google.com/mapfiles/ms/icons/blue-dot.png' alt='blue map marker'/>
                    <TextField
                        label="Search Term 1"
                        className='term1-input'
                        value={props.searchValue1} 
                        onChange={props.inputChangedSearchValue1}
                        placeholder="food"
                    />
                </div>
                
                <div className='input-container'>
                    <img src='http://maps.google.com/mapfiles/ms/icons/green-dot.png' alt='green map marker'/>
                    <TextField
                        label="Search Term 2"
                        className='term2-input'
                        value={props.searchValue2} 
                        onChange={props.inputChangedSearchValue2}
                        placeholder="gas stations"
                    />
                </div>

                <div className='input-container'>
                    <img src='http://maps.google.com/mapfiles/ms/icons/orange-dot.png' alt='brownish orangish marker'/>
                    <TextField
                        label="Search Term 3"
                        className='term3-input'
                        value={props.searchValue3} 
                        onChange={props.inputChangedSearchValue3}
                        placeholder="yoga"
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