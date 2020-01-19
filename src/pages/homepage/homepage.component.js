import React from 'react';

import './homepage.styles.scss';
import SearchBox from '../../components/search_box/search_box.component';



import MapItem from '../../components/map_item/map_item.component';
import MapResultsDisplay from '../../components/map_results_display/map_results_display.component';

const HomePage = () => {
    return(
    <div className='homepage'>
        <div className='search-box'>
            <SearchBox />
        </div> 
        
        <div className='map-container'>
            <MapItem className='map-item'
            />
        </div>
        <div className='results-container'>
            <MapResultsDisplay />
        </div>
        
    </div>
    )
};;

export default HomePage;