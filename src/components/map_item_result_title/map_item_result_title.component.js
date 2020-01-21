import React from 'react';

import './map_item_result_title.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSearchTerms, selectLocationValue, selectSearchValue1, selectSearchValue2, selectSearchValue3 } from '../../redux/map/map.selectors';


const MapItemResultTitle = ({item: { name, formatted_address, id, photo, price_level, rating, user_ratings_total }}) => {
    
            // title: title_name + "-"
            // + place.name
            // + '--PlaceID= '
            // + place.place_id
            // + '--f_address= '
            // + place.formatted_address,
    return (
        <div className='result-item-container' key={id}>
            <h4>{name} {formatted_address}</h4>
            <img src={photo} alt={photo} />
    {
        price_level 
        ? <p>Price Level: {price_level}</p> 
        : ''
    }
    {
        rating > 0
        ? <p>Rating: {rating}</p> 
        : ''
    }
    {
        user_ratings_total > 0
        ? <p>Total Ratings: {user_ratings_total}</p> 
        : ''
    }
            

        </div>
    );
}

const mapStateToProps = createStructuredSelector(
    {
        searchTerms: selectSearchTerms,
        locationValue: selectLocationValue,
        searchValue1: selectSearchValue1,
        searchValue2: selectSearchValue2,
        searchValue3: selectSearchValue3
    }
)

export default connect(mapStateToProps)(MapItemResultTitle);