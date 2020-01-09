import React from 'react';

import './homepage.styles.scss';
import SearchTerms from '../../components/search_terms/search_terms.component';

import MapPlaceholder from '../../assets/austin_map.png';
import ResultsPlaceHolder from '../../assets/austin_results.png';
import MapItem from '../../components/map_item/map_item.component';

const HomePage = () => (
    <div className='homepage'>
        <div className='search-box'>
            <SearchTerms />
        </div>
        <div className='map'>
            <MapItem />
        </div>
        <div className='results-box'>
            <img src={ResultsPlaceHolder} />
        </div>
    </div>
);

export default HomePage;