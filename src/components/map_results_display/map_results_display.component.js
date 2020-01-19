import React from 'react';

import './map_results_display.styles.scss';

import MapItemResult from '../map_item_result/map_item_result.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSearchTerms, selectLocationValue, selectSearchValue1, 
    selectSearchValue2,selectSearchValue3, selectSearchResults } from '../../redux/map/map.selectors';



const MapResultsDisplay = ({ searchResults, ...props }) => {

    return (
        <div>

            <div>
            {
                
                searchResults.map(result => (
                    <MapItemResult key={result.id} item={ result } />
                ))
            } 
            </div>

            {
                !props.searchTerms.length
                    ? <p>NO TERMS</p>
                    : props.searchTerms
                        .filter((term, index) => index < props.searchTerms.length)
                        .map(term => (
                            <div key={term.id}> {term} </div>
                        ))
            }
            <div>
                <p>{props.locationValue}</p>
                <p>{props.searchValue1}</p>
                <p>{props.searchValue2}</p>  
                <p>{props.searchValue3}</p>

            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector(
    {
        searchTerms: selectSearchTerms,
        locationValue: selectLocationValue,
        searchValue1: selectSearchValue1,
        searchValue2: selectSearchValue2,
        searchValue3: selectSearchValue3,
        searchResults: selectSearchResults
    }
)



export default connect(mapStateToProps)(MapResultsDisplay);