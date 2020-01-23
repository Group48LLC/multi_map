import React from 'react';

import './map_results_display.styles.scss';

import MapItemResultTitle from '../map_item_result_title/map_item_result_title.component';
import MapItemResultContent from '../map_item_result_content/map_item_result_content.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {addSearchResultId, setSearchFlag} from '../../redux/map/map.actions';
import { selectSearchTerms, selectLocationValue, selectSearchValue1, selectSearchResultIdList, 
    selectSearchValue2,selectSearchValue3, selectSearchResults,selectSearchResultsDetailed } from '../../redux/map/map.selectors';
import { ReactComponent as DownArrow } from '../../assets/double_down_arrow.svg'; 


const MapResultsDisplay = ({ searchResults, searchResultIdList, addSearchResultId,  setSearchFlag, ...props }) => {
    
    const handleClick = (result) => {
       if(result.id){
        let id = result.id;
        addSearchResultId(id);
        setSearchFlag(5)
       } 
       //console.log('SEARCH RESULTS ID LIST ===> ' + JSON.stringify(searchResultIdList))
    }
    return (
        <div>
            <div>
            {
                
                searchResults.map(result => (
                    <div>
                        <MapItemResultTitle  item={result}/>
                        <button> <DownArrow onClick={() => handleClick(result)}/></button>
                        <MapItemResultContent item={result} />
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
        searchResults: selectSearchResults,
        searchResultsDetailed: selectSearchResultsDetailed,
        searchResultIdList: selectSearchResultIdList
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        addSearchResultId: id => dispatch(addSearchResultId(id)),
        setSearchFlag: (term) => dispatch(setSearchFlag(term))
    }
  );


export default connect(mapStateToProps, mapDispatchToProps)(MapResultsDisplay);