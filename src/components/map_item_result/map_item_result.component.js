import React from 'react';

import './map_item_result.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSearchTerms, selectLocationValue, selectSearchValue1, selectSearchValue2 } from '../../redux/map/map.selectors';


const MapItemResult = ({item: { name, formatted_address, id }}) => {
    
            // title: title_name + "-"
            // + place.name
            // + '--PlaceID= '
            // + place.place_id
            // + '--f_address= '
            // + place.formatted_address,
    return (
        <div className='result-item-container'>
            <h2>{name}</h2>
            <p>{formatted_address}</p>
            <p>{id}</p>
        </div>
    );
}

const mapStateToProps = createStructuredSelector(
    {
        searchTerms: selectSearchTerms,
        locationValue: selectLocationValue,
        searchValue1: selectSearchValue1,
        searchValue2: selectSearchValue2
    }
)

export default connect(mapStateToProps)(MapItemResult);