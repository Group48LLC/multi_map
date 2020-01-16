import React from 'react';

import './map_item.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//import { selectSearchTerms } from '../../redux/map/map.selectors';
import MapResultsDisplay from '../map_results_display/map_results_display.component';
import MapItemResult from '../map_item_result/map_item_result.component';

import { GOOGLE_MAP_API_KEY } from '../../firebase/firebase.config';

import { selectMapZoom, selectMapType, selectSearchValue1, selectSearchFlag,
  selectLocationValue, selectSearchTerms, selectSearchResults } from '../../redux/map/map.selectors';

import { addSearchResult } from '../../redux/map/map.actions';

import { clearSearchFlag} from '../../redux/map/map.actions';

//import CustomButton from '../custom_button/custom_button.component';


class MapItem extends React.Component {
  thing1 = {};
  thing2 = {};
  flag1 = false;
  markerList = [];
  //flag2=false;

  // map ref
  googleMapRef = React.createRef()
  googleMap = {};
  
  createMap = (mapZoom, mapType) => {
    console.log('FIRE ==> createMap ')
    // const { mapZoom, mapType } = this.props;
    const map = new window.google.maps.Map(this.googleMapRef.current, {
      center: { lat: 30.267153, lng: -97.7430608 },
      zoom: mapZoom,
      mapTypeId: mapType,
    });
    // this sets your global map object
    this.googleMap = map;
    // global googleMap creation logs.
    // console.log(
    //   'GLOBAL googleMap object creation logs: \n'
    //   +'googleMap zoom: ' + this.googleMap.zoom+'\n'
    //   +'googleMap mapTypeId: ' + this.googleMap.mapTypeId+'\n'
    // )
    //console.log()
  }

  findPlace = (location, findItemsThis) => {
    console.log('FIRE ==> findPlace ')
    const map = this.googleMap;
    var request = {
      query: location,
      fields: ['name', 'geometry'],
    };
    const service = new window.google.maps.places.PlacesService(this.googleMap);
    service.findPlaceFromQuery(request, function (results, status) {
      console.log('FIRE ==> findPlace CALL_BACK ')
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          //this.createMarker(map, results[i]);
          // console.log('i= ' + i)
          // console.log('findPlace , ct=' + results.length + ' Marker location = ' + results[i].geometry.location)
        }
        map.setCenter(results[0].geometry.location);
        console.log('FIRE ==> setCenter')
        findItemsThis(this.findPlaceItems());
      }
    });
  }

 

  createMarker_2(place, title_name, hueColor, googleMap) {
    console.log('FIRE ==> createMarker_2 ')
    // if place===NULL
    let marker = new window.google.maps.Marker({
      map: googleMap,
      position: place.geometry.location,
      title: title_name + "-"
        + place.name
        + ', '
        + place.formatted_address,
      icon: hueColor
    });
    window.google.maps.event.addListener(marker, 'click', function () {
      console.log('FIRE ==> createMarker_2 -- CLICK ' + marker)
    });
    
    return marker;
  }

  removeMarkers = () => {
    console.log('FIRE ==> removeMarkers ')
    this.markerList.map(marker => (
      marker.setMap(null)
    ))
    this.markerList = [];
  }

  findItems = (findPlaceItemsThis, ) => {
    const{ searchTerms } = this.props;
    findPlaceItemsThis(
      searchTerms[0],
        "00",
         'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    );
    findPlaceItemsThis(
      searchTerms[1],
       "11",
        'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    );
  }


  findPlaceItems(searchTerm, createMarkerThis, title_name, hueColor ) {
    console.log('FIRE ==> findPlaceItems ')
    const {addSearchResult} = this.props;
    
    let map = this.googleMap;
    // let m_list = this.markerList;
    var results = []
    var request = {
      query: searchTerm,
      fields: ['name', 'geometry', 'formatted_address', 'place_id'],
      location: map.center
    };
    //  locationBias: map.center,
    const service = new window.google.maps.places.PlacesService(map);
    service.textSearch(request, function (results, status) {
      console.log('FIRE ==> findPlaceItems CALLBACK, ' + searchTerm)
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          //this.createMarker(map, results[i]);
          //console.log('i= ' + i)
          //console.log('findPlaceItems , ct=' + results.length + ' MARKER LOCATION = ' + results[i].geometry.location)
          //console.log(results[i].geometry.location)
          //console.log(results[i].name)
          // console.log('************i= ' + i + 'results of i == ' + results[i])
          let item = {
            name: results[i].name,
            formatted_address: results[i].formatted_address,
            id: results[i].place_id
          }
          // console.log('Results== ' + item.name)
          // console.log('Results== ' + item.formatted_address)
          // console.log('Results== ' + item.id)
          addSearchResult(item);
          //createMarkerThis(results[i], title_name, hueColor, map)
          this.googleMap = map;
        }
        
      }
    });
    this.thing2 = results;
    return results
  }

  componentDidMount() {
    console.log('FIRE ==> componentDidMount ')
    const {mapZoom, mapType} = this.props;
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.createMap(mapZoom, mapType);
      })
    } else {
       this.createMap(mapZoom, mapType);
    }
    //console.log()
  }

  componentDidUpdate(){
    console.log('FIRE ==> componentDidUpdate ')
    const {mapZoom, mapType, locationValue, searchTerms, searchFlag} = this.props;
    const {clearSearchFlag} = this.props;

    if((searchTerms.length > 0) && (searchFlag>0)){

      this.removeMarkers();
      this.findPlace(locationValue, this.findItems())
      // if(this.googleMap.center !== { lat: 30.267153, lng: -97.7430608 }){
      //   this.findPlaceItems(searchTerms[0], this.createMarker_2, "00", 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
      //   this.findPlaceItems(searchTerms[1], this.createMarker_2, "11", 'http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      // }
      clearSearchFlag()
    }
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
    clearSearchFlag: () => dispatch(clearSearchFlag())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(MapItem);
//export default connect(mapStateToProps)(MapItem);