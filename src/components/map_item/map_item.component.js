import React from 'react';

import './map_item.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MapResultsDisplay from '../map_results_display/map_results_display.component';

import { GOOGLE_MAP_API_KEY } from '../../firebase/firebase.config';

import {
  selectMapZoom, selectMapType,
  selectSearchValue1, selectSearchFlag,
  selectSearchTerms, selectSearchResults, selectLocationList, selectLocationValue
} from '../../redux/map/map.selectors';

import { addSearchResult } from '../../redux/map/map.actions';

import { clearSearchFlag , setSearchFlag} from '../../redux/map/map.actions';

class MapItem extends React.Component {

  markerList = [];
  googleMap = null;
  googleMapRef = React.createRef();

  createMap = () => {
    const { mapZoom, mapType, locationValue, searchTerms ,searchFlag} = this.props;
    
    console.log('FIRE ==> createMap , searchFlag='+searchFlag)
    if (this.googleMap == null) {
      console.log('DO ===> createMap ')
      const map = new window.google.maps.Map(this.googleMapRef.current, {
        center: { lat: 30.267153, lng: -97.7430608 },
        zoom: mapZoom,
        mapTypeId: mapType,
      });
      this.googleMap = map;
    }else{
      console.log('DO ==> update map , flag='+searchFlag)

      if ((locationValue.length > 0) && (searchFlag===1) ){
        this.removeMarkers()
        this.findPlace();
      }
      if (searchFlag===3) {
        if (searchTerms.length > 0)  {
          this.findPlaceItems(
            searchTerms[0],
            "1",
            'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            this.createMarker_2
          );
        }
        if (searchTerms.length > 1)  {
          this.findPlaceItems(
            searchTerms[1],
            "2",
            'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            this.createMarker_2
          ); 
        }
        if (searchTerms.length > 2)  {
          this.findPlaceItems(
            searchTerms[2],
            "3",
            'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
            this.createMarker_2
          );
        }
      }
    }
  }

  findPlace = () => {
    console.log('FIRE ==> findPlace ')
    const { locationList, locationValue, setSearchFlag } = this.props;
    const map = this.googleMap;
    var request = {
      query: locationValue,
      fields: ['name', 'geometry'],
    };
    setSearchFlag(2)
    console.log('DO ===> setSearchFlag(2) ')
    const service = new window.google.maps.places.PlacesService(this.googleMap);
    service.findPlaceFromQuery(request, function (results, status) {
      console.log('FIRE ==> findPlace CALL_BACK ')
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
        }
        map.setCenter(results[0].geometry.location);
        console.log('FIRE ==> setCenter')
        setSearchFlag(3)
      }
    });
  }

  createMarker_2 = (place, title_name, hueColor) => {
    console.log('FIRE ==> createMarker_2 ')
    let marker = new window.google.maps.Marker({
      map: this.googleMap,
      position: place.geometry.location,
      title: title_name + "-"
        + place.name
        + ', '
        + place.formatted_address,
      icon: hueColor
    });
    window.google.maps.event.addListener(marker, 'click', function () {
      console.log('FIRE ==> createMarker_2 -- CLICK ' + marker.title)
    });
    this.markerList.push(marker);
    return marker;
  }

  removeMarkers = () => {
    console.log('FIRE ==> removeMarkers ')
    this.markerList.map(marker => (
      marker.setMap(null)
    ))
    this.markerList = [];
  }

  findPlaceItems = (searchTerm, title_name, hueColor, createMarkerThis) => {
    console.log('FIRE ==> findPlaceItems ')

    const { addSearchResult, setSearchFlag } = this.props;
    setSearchFlag(4);
    let map = this.googleMap;
    var results = []
    var request = {
      query: searchTerm,
      fields: ['name', 'geometry', 'formatted_address', 'place_id'],
      location: map.center
    };
    const service = new window.google.maps.places.PlacesService(map);
    service.textSearch(request, function (results, status) {
      console.log('FIRE ==> findPlaceItems CALLBACK, ' + searchTerm)
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          let item = {
            name: results[i].name,
            formatted_address: results[i].formatted_address,
            id: results[i].place_id
          }
          // console.log('Results== ' + item.name)
          // console.log('Results== ' + item.formatted_address)
          // console.log('Results== ' + item.id)
          addSearchResult(item);
          createMarkerThis(results[i], title_name, hueColor);
        }
      }
    }); // end of callback
    return results
  }

  componentDidMount() {
    console.log('FIRE ==> componentDidMount ')

    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        window.document.body.appendChild(s);
        this.createMap()
      })
    } else {
      this.createMap();
    }
  }

  componentDidUpdate() {
    console.log('FIRE ==> componentDidUpdate ')
    this.createMap();
  }


  render() {
    console.log('FIRE ==> render ')
    return (
      <div className='map-container'>
        <div
          style={{ width: 500, height: 500 }}
          ref={this.googleMapRef}
          id="map"
          className="map-styles"
        />
        <MapResultsDisplay />
      </div>

    );
  }
};
const mapStateToProps = createStructuredSelector(
  {
    mapZoom: selectMapZoom,
    mapType: selectMapType,
    locationList: selectLocationList,
    locationValue: selectLocationValue,
    searchValue1: selectSearchValue1,
    searchTerms: selectSearchTerms,
    searchResults: selectSearchResults,
    searchFlag: selectSearchFlag
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    addSearchResult: item => dispatch(addSearchResult(item)),
    clearSearchFlag: () => dispatch(clearSearchFlag()),
    setSearchFlag: (term) => dispatch(setSearchFlag(term))
    
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(MapItem);