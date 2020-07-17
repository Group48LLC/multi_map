import React from 'react';

import './map_item.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GOOGLE_MAP_API_KEY } from '../../firebase/firebase.config';

import {
  selectMapZoom, selectMapType, selectSearchResultIdList,
  selectSearchValue1, selectSearchFlag, selectSearchResultsDetailed,
  selectSearchTerms, selectSearchResults, selectLocationList, selectLocationValue
} from '../../redux/map/map.selectors';

import { addSearchResult, addSearchResultDetail } from '../../redux/map/map.actions';

import { clearSearchFlag, setSearchFlag } from '../../redux/map/map.actions';

class MapItem extends React.Component {

  markerList = [];
  googleMap = null;
  googleMapRef = React.createRef();

  createMap = () => {
    const { mapZoom, mapType, locationValue, searchTerms, searchFlag } = this.props;
    console.log('FIRE ==> createMap , searchFlag=' + searchFlag)
    if (this.googleMap == null) {
      console.log('DO ===> createMap ')
      const map = new window.google.maps.Map(this.googleMapRef.current, {
        center: { lat: 30.267153, lng: -97.7430608 },
        zoom: mapZoom,
        mapTypeId: mapType,
      });
      this.googleMap = map;
    } else {
      console.log('DO ==> update map , flag=' + searchFlag);

      if ((locationValue.length > 0) && (searchFlag === 1)) {
        this.removeMarkers()
        this.findPlace();
      }
      if (searchFlag === 3) {
        if (searchTerms.length > 0) {
          this.findPlaceItems(
            searchTerms[0],
            "1",
            'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            this.createMarker_2
          );
        }
        if (searchTerms.length > 1) {
          this.findPlaceItems(
            searchTerms[1],
            "2",
            'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            this.createMarker_2
          );
        }
        if (searchTerms.length > 2) {
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

  createPhoto = (place) => {
    let photos = place.photos;
    if (!photos) {
      return;
    }

    let photo = photos[0].getUrl({
      'maxWidth': 150,
      'maxHeight': 150
    })
    return photo;
  }

  

  getDetails2 = (id) => {
    const {addSearchResultDetail} = this.props;
    let map = this.googleMap;
    let request = {
      placeId: id,
      fields: [
        'id', 'name', 'formatted_address', 'opening_hours.weekday_text', 'reviews', 'url']
    };
    let service = new window.google.maps.places.PlacesService(map);
    service.getDetails(request, function(place, status) {
       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        addSearchResultDetail(place);
      }
      return place;
    });
  }

  findPlace = () => {
    console.log('FIRE ==> findPlace ')
    const { locationValue, setSearchFlag } = this.props;
    const map = this.googleMap;
    let request = {
      query: locationValue,
      fields: ['name', 'geometry'],
    };
    setSearchFlag(2)
    console.log('DO ===> setSearchFlag(2) ')
    const service = new window.google.maps.places.PlacesService(this.googleMap);
    service.findPlaceFromQuery(request, function (results, status) {
      console.log('FIRE ==> findPlace CALL_BACK ')

      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          //console.log('PLACE RESULTS ==' + JSON.stringify(results[i], null, 2))
        }
        map.setCenter(results[0].geometry.location);
        console.log('PLACE RESULTS ==' + results[0])
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

  findPlaceItems = (searchTerm, title_name, hueColor, createMarkerThis, getDetailsThis) => {
    console.log('FIRE ==> findPlaceItems ')
    const { addSearchResult, setSearchFlag} = this.props;
    setSearchFlag(4);
    let map = this.googleMap;
    let photoUrl = '';
    let request = {
      query: searchTerm,
      fields: ['name', 'geometry', 'formatted_address', 'place_id', 'photos', 'price_level', 'rating', 'user_ratings_total'],
      location: map.center
    };
    const service = new window.google.maps.places.PlacesService(map);
    service.textSearch(request, function (results, status) {
      console.log('FIRE ==> findPlaceItems CALLBACK, ' + searchTerm)
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          //console.log('RESULTS[I] == ' + JSON.stringify(results[i], null, 2))
          // photo extraction
          if (results[i].photos) {
            photoUrl = results[i].photos[0].getUrl({
              'maxWidth': 150,
              'maxHeight': 150
            })
            console.log('PHOTO_URL === ' + photoUrl)
          }
          let item = {
            name: results[i].name,
            formatted_address: results[i].formatted_address,
            id: results[i].place_id,
            photo: photoUrl,
            price_level: results[i].price_level ? results[i].price_level : '',
            rating: results[i].rating,
            user_ratings_total: results[i].user_ratings_total
          }
          // searchResults limit here
          if(i < 5){
            addSearchResult(item);
          }
          createMarkerThis(results[i], title_name, hueColor);
        }
      }
    }); // end of textSearch callback
  }

  componentDidMount() {
    console.log('FIRE ==> componentDidMount ')

    if (!window.google) {
      let s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
      let x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        window.document.body.appendChild(s);
        this.createMap();
       // console.log('WINDOW.GOOGLE === ' + JSON.stringify(window.google, null, 2));
      })
    } else {
      this.createMap();
      //console.log('WINDOW.GOOGLE === ' + JSON.stringify(window.google, null, 2));
    }
  }

  componentDidUpdate() {
    console.log('FIRE ==> componentDidUpdate ')
    this.createMap();
     const {searchResultIdList, searchFlag, setSearchFlag} = this.props;
     for(let i = 0; i < searchResultIdList.length; i++){
      let myId = searchResultIdList[i];
        if(searchFlag === 5){
        this.getDetails2(myId);
        setSearchFlag(4)
        }
     }
  }

  render() {
    console.log('FIRE ==> render ')
    const mystyle = {
      height: '100vh', 
      width: '90vw'
    };
    return (
        <div
          style={mystyle}
          ref={this.googleMapRef}
          id="map"
          className="map-styles"
        />
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
    searchFlag: selectSearchFlag,
    searchResultsDetailed: selectSearchResultsDetailed,
    searchResultIdList: selectSearchResultIdList
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    addSearchResult: item => dispatch(addSearchResult(item)),
    clearSearchFlag: () => dispatch(clearSearchFlag()),
    setSearchFlag: (term) => dispatch(setSearchFlag(term)),
    addSearchResultDetail: item => dispatch(addSearchResultDetail(item))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(MapItem);