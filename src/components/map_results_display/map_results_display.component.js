import React from 'react';

import './map_results_display.styles.scss';

import MapItemResultTitle from '../map_item_result_title/map_item_result_title.component';
import MapItemResultContent from '../map_item_result_content/map_item_result_content.component';
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
                    <div>
                        <MapItemResultTitle key={result.id} item={result}/>
                        <MapItemResultContent item={result}/>
                    </div>
                ))
            } 
            </div>
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