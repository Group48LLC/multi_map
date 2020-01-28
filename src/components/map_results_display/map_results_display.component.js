import React from 'react';

import './map_results_display.styles.scss';

import MapItemResultTitle from '../map_item_result_title/map_item_result_title.component';
import MapItemResultContent from '../map_item_result_content/map_item_result_content.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {addSearchResultId, setSearchFlag, toggleShowDetails} from '../../redux/map/map.actions';

import { selectSearchTerms, selectSearchResultIdList, 
    selectSearchResults,selectSearchResultsDetailed, selectSearchFlag} from '../../redux/map/map.selectors';

import { ReactComponent as DownArrow } from '../../assets/double_down_arrow.svg'; 


const MapResultsDisplay = ({ searchResults, showDetailsToggle, searchFlag, toggleShowDetails, searchResultIdList, addSearchResultId,  setSearchFlag, ...props }) => {
    
    const handleClick = (result) => {
        
        if(result.id){
            let id = result.id;
            addSearchResultId(id);
            setSearchFlag(5)
            toggleShowDetails(id)
           }
       //console.log('SEARCH RESULTS ID LIST ===> ' + JSON.stringify(searchResultIdList))
    }
    return (
        <div className="result">
            <div>
            {
                
                searchResults.map(result => (
                    <div>
                        <MapItemResultTitle  item={result}/>
                        <button> <DownArrow onClick={() => handleClick(result)}/></button>
                        {
                        (result.show_detail_flag)
                            ?<MapItemResultContent detail_id={result.detail_id} />
                            :''
                        }    
                    </div>
                ))
            } 
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector(
    {
        searchTerms: selectSearchTerms,
        searchResults: selectSearchResults,
        searchResultsDetailed: selectSearchResultsDetailed,
        searchResultIdList: selectSearchResultIdList,
        searchFlag: selectSearchFlag
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        addSearchResultId: id => dispatch(addSearchResultId(id)),
        setSearchFlag: (term) => dispatch(setSearchFlag(term)),
        toggleShowDetails: (id) => dispatch(toggleShowDetails(id))
    }
  );


export default connect(mapStateToProps, mapDispatchToProps)(MapResultsDisplay);