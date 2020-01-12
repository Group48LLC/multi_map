import React from 'react';

import './homepage.styles.scss';
import SearchBox from '../../components/search_box/search_box.component';



import MapItem from '../../components/map_item/map_item.component';
import MapResults from '../../components/map_results/map_results.component';
//import MapItem2 from '../../components/map_item2/map_item2.component';

const HomePage = () => {
    
    //  handleMapLoad = (map) => {
    //       var marker = new window.google.maps.Marker({
    //         position: { lat: 41.0082, lng: 28.9784 },
    //         map: map,
    //         title: 'Hello youall Istanbul!'
    //       });
    //     }
    // const testOptions = {
    //     center: { lat: 41.0082, lng: 28.9784 },
    //     zoom: 8
    // }

    return(
    <div className='homepage'>
        <div className='search-box'>
            <SearchBox />
        </div> 
        
        <div className='map'>
        <MapItem className='map-item'
        />
        </div>
        <div className='results-box'>
            <MapResults />
        </div>
    </div>
    )
};;

export default HomePage;