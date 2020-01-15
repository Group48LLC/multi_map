import React from 'react';

import './map_item.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//import { selectSearchTerms } from '../../redux/map/map.selectors';
import MapResultsDisplay from '../map_results_display/map_results_display.component';
import MapItemResult from '../map_item_result/map_item_result.component';

import { GOOGLE_MAP_API_KEY } from '../../firebase/firebase.config';

import { selectMapZoom, selectMapType, selectSearchValue1,
  selectLocationValue, selectSearchTerms, selectSearchResults } from '../../redux/map/map.selectors';

import { addSearchResult } from '../../redux/map/map.actions';

//import CustomButton from '../custom_button/custom_button.component';


class MapItem extends React.Component {
  thing1 = {};
  thing2 = {};
  flag1 = false;
  markerList = [];
  //flag2=false;
  

  onScriptLoad() {
    this.createMap();
  }

  createMap() {
    const { mapZoom, mapType } = this.props;
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 30.267153, lng: -97.7430608 },
      zoom: mapZoom,
      mapTypeId: mapType,
    });
    this.flag1 = true;
    this.thing1 = map;
  }

  findPlace(location) {

    const map = this.thing1;

    var request = {
      query: location,
      fields: ['name', 'geometry'],
    };
    const service = new window.google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function (results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          //this.createMarker(map, results[i]);
          console.log('i= ' + i)
          console.log('findPlace , ct=' + results.length + ' Marker location = ' + results[i].geometry.location)
        }
        map.setCenter(results[0].geometry.location);
      }
    });
  }

  createMarker_2(map, place, title_name, hueColor) {
    // Extra fields ';...;'
    // title: title_name + "-"
    // + place.name
    // + '--PlaceID= '
    // + place.place_id
    // + '--f_address= '
    // + place.formatted_address,
    let marker = new window.google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: title_name + "-"
        + place.name
        + ', '
        + place.formatted_address,
      icon: hueColor
    });
    window.google.maps.event.addListener(marker, 'click', function () {
      console.log('createMarker_2--FIRE' + marker)
    });
    return marker;
  }

  removeMarkers = () => {
    this.markerList.map(marker => (
      marker.setMap(null)
    ))
    this.markerList = [];
  }


  findPlaceItems(searchTerm, titlename, create_marker_this, hueColor) {
    const {addSearchResult} = this.props;
    
    const map = this.thing1;
    let m_list = this.markerList;
    var results = []
    var request = {
      query: searchTerm,
      fields: ['name', 'geometry', 'formatted_address', 'place_id'],
      location: map.center
    };
    //  locationBias: map.center,
    const service = new window.google.maps.places.PlacesService(map);
    service.textSearch(request, function (results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          //this.createMarker(map, results[i]);
          //console.log('i= ' + i)
          //console.log('findPlaceItems , ct=' + results.length + ' MARKER LOCATION = ' + results[i].geometry.location)
          //console.log(results[i].geometry.location)
          //console.log(results[i].name)
          console.log('************i= ' + i + 'results of i == ' + results[i])
          let item = {
            name: results[i].name,
            formatted_address: results[i].formatted_address,
            id: results[i].place_id
          }
          console.log('Results== ' + item.name)
          console.log('Results== ' + item.formatted_address)
          console.log('Results== ' + item.id)
          
            addSearchResult(item);
          /*
            redux.push(results[i].name)
            redux.push()
            redux.push(results[i].place_id)
          */
          let marker = create_marker_this(map, results[i], titlename, hueColor)
          m_list.push(marker);
        }
      }
    });
    this.thing2 = results;
    return results
  }

  componentDidMount() {
    
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()

      })
    } else {
      this.createMap();
    }
  }

  render() {
    const { locationValue, searchTerms } = this.props;
    const {searchResults} = this.props;
    let results=[];
    let results2=[];
    if (this.flag1) {
      this.removeMarkers();
      this.findPlace(locationValue)
      if (searchTerms.length > 0) {
        results = this.findPlaceItems(
          searchTerms[0],
           "00",
            this.createMarker_2,
             'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
             )
        console.log('IN RENDER @@@@@ Length=' + results.length)
      }
      if (searchTerms.length > 1) {
        results2 = this.findPlaceItems(
          searchTerms[1],
           "11",
            this.createMarker_2,
             'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
             )
        console.log('IN RENDER @@@@@ Length=' + results2.length)
      }
    }

    console.log('RENDER - flag=' + this.flag1 + ' loc=' + locationValue)
    console.log(this.thing1)
    return (
      <div className='map-container'>
        <div style={{ width: 500, height: 500 }} id='map' className='map-styles' />
        <MapResultsDisplay />
        {
          searchResults.map(result => (
            <MapItemResult item={ result } />
        ))
        }
      </div>

    );
  }
};
const mapStateToProps = createStructuredSelector(
  {
    mapZoom: selectMapZoom,
    mapType: selectMapType,
    locationValue: selectLocationValue,
    searchValue1: selectSearchValue1,
    searchTerms: selectSearchTerms,
    searchResults: selectSearchResults
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    addSearchResult: item => dispatch(addSearchResult(item))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(MapItem);
//export default connect(mapStateToProps)(MapItem);