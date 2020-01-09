import React from 'react';

import './homepage.styles.scss';
import SearchBox from '../../components/search_box/search_box.component';


import ResultsPlaceHolder from '../../assets/austin_results.png';
import MapItem from '../../components/map_item/map_item.component';

const HomePage = () => (
    <div className='homepage'>
        <div className='search-box'>
            <SearchBox />
        </div>
        <div className='map'>
            <MapItem />
        </div>
        <div className='results-box'>
            <img src={ResultsPlaceHolder} alt='search info results' />
        </div>
    </div>
);

export default HomePage;