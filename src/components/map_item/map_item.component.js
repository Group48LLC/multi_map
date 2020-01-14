import React from 'react';

import './map_item.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//import { selectSearchTerms } from '../../redux/map/map.selectors';


import { GOOGLE_MAP_API_KEY } from '../../firebase/firebase.config';
import { selectMapZoom, selectMapType, selectMapWidget, selectSearchValue1, selectLocationValue, selectSearchTerms } from '../../redux/map/map.selectors';
import { setMapWidget } from '../../redux/map/map.actions';
//import CustomButton from '../custom_button/custom_button.component';


class MapItem extends React.Component { 
  thing1={};
  thing2={};
  flag1=false;
  //flag2=false;

  onScriptLoad() {
    this.createMap();
  }
  
  createMap() {
    const { mapZoom, mapType } = this.props;
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat:30.267153, lng:-97.7430608},
      zoom: mapZoom,
      mapTypeId: mapType,
    });
    this.flag1=true;
    this.thing1=map;
  }

  findPlace( location){

    const map = this.thing1;

    var request = {
      query: location,
      fields: ['name', 'geometry'],
    };
    const service = new window.google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          //this.createMarker(map, results[i]);
          console.log( 'i= ' + i )
          console.log('findPlace , ct=' + results.length + ' Marker location = ' + results[i].geometry.location)
        }
        map.setCenter(results[0].geometry.location);
      }
    });
  }
   
  // createMarkers(results,titlename) {
  //   const map = this.thing1;
  //   const results2 = results;
  //   console.log('createMarkers Length2='  + results2.length)
  //   for (var i = 0; i < results2.length; i++) {
  //     //this.createMarker(map, results[i]);
  //     console.log('createMarkers MARKER LOCATION = ' + results2[i].geometry.location)
  //     var marker = new window.google.maps.Marker({
  //       map: map,
  //       position: results2[i].geometry.location,
  //       title:titlename
  //     });
  
  //     window.google.maps.event.addListener(marker, 'click', function() {
  //       console.log('createMarker--FIRE')
  //     });
  //   }
  // }
 
  // createMarker(map, place) {

  //   var marker = new window.google.maps.Marker({
  //     map: map,
  //     position: place.geometry.location
  //   });

  //   window.google.maps.event.addListener(marker, 'click', function() {
  //     console.log('createMarker--FIRE')
  //   });
  // }

  createMarker_2(map, place, title_name, hueColor) {
    var marker = new window.google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: title_name + "-" + place.name,
      icon: hueColor
    });

    window.google.maps.event.addListener(marker, 'click', function() {
      console.log('createMarker_2--FIRE' + marker)
    });
  }
  

  findPlaceItems( searchTerm,titlename, create_marker_this, hueColor){
    const map = this.thing1;
    var results=[]
    var request = {
      query: searchTerm,
      fields: ['name', 'geometry'],
      location: map.center
    };
    //  locationBias: map.center,
    const service = new window.google.maps.places.PlacesService(map);
    service.textSearch(request, function(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          //this.createMarker(map, results[i]);
          console.log('i= '+i)
          console.log('findPlaceItems , ct=' + results.length + ' MARKER LOCATION = ' + results[i].geometry.location)
          console.log( results[i].geometry.location)
          console.log( results[i].name)
          console.log( results[i])
         
          create_marker_this(map, results[i], titlename, hueColor) 
        }
        // this.thing2=results[0];
        // this.flag2=true;
        // map.setCenter(results[0].geometry.location);
      }
    });
    this.thing2=results;
    return results
  }


  // findPlaceItemsQuery( searchTerm){
  //   const map = this.thing1;
  //   var results=[]
  //   var request = {
  //     query: searchTerm,
  //     fields: ['name', 'geometry'],
  //     location: map.center
  //   };
  //   //  locationBias: map.center,
  //   const service = new window.google.maps.places.PlacesService(map);
  //   service.findPlaceFromQuery(request, function(results, status) {
  //     if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  //       for (var i = 0; i < results.length; i++) {
  //         //this.createMarker(map, results[i]);
  //         console.log('i= '+i)
  //         console.log('findPlaceItems , ct=' + results.length + ' MARKER LOCATION = ' + results[i].geometry.location)
  //         console.log( results[i].geometry.location)
  //         console.log( results[i].name)
  //         console.log( results[i])
  //         var marker = new window.google.maps.Marker({
  //           map: map,
  //           position: results[i].geometry.location
  //         });
      
  //         window.google.maps.event.addListener(marker, 'click', function() {
  //           console.log('createMarker--FIRE' + marker)
  //         });
  //       }
  //       // this.thing2=results[0];
  //       // this.flag2=true;
  //       // map.setCenter(results[0].geometry.location);
  //     }
  //   });
  //   this.thing2=results;
  //   return results
  // }


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
    // let map = new window.google.maps.Map(document.getElementById('map'), {
    //   center: {lat: -33.8688, lng: 151.2195},
    //   zoom: 13,
    //   mapTypeId: 'roadmap',
    // });
  }

  render() {
    const { locationValue ,searchValue1 ,searchTerms } = this.props;
    if (this.flag1 ) {
      //this.findPlace( searchValue1 + " near " + locationValue)
      this.findPlace( locationValue)
      if ( searchTerms.length > 0 ) {
        // const terms = searchTerms[0] + " in " + locationValue
        // var results = this.findPlaceItems(terms)      
        var results = this.findPlaceItems(searchTerms[0],"00" , this.createMarker_2, 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' )

        console.log('IN RENDER @@@@@ Length='  + results.length)
        //this.createMarkers(results, "1")
      }
      if ( searchTerms.length > 1 ) {
        // const terms = searchTerms[0] + " in " + locationValue
        // var results = this.findPlaceItems(terms)      
        var results2 = this.findPlaceItems(searchTerms[1],"11", this.createMarker_2, 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' )

        console.log('IN RENDER @@@@@ Length='  + results2.length)
        //this.createMarkers(results2, "2")
      }
      
      
    }
    // if (this.flag2 ) {
    //   this.createMarker(this.thing1, this.thing2);
    // }
     console.log('RENDER - flag=' + this.flag1 + ' loc=' + locationValue)
     console.log(this.thing1)
    return (
      <div>
        {/* <CustomButton onClick={this.findPlace(this.createMap(), props.locationValue)}></CustomButton> */}
        <div style={{ width: 500, height: 500 }} id='map' className='map-styles' />
      </div>
        
    );
  }
};
const mapStateToProps = createStructuredSelector(
  {
    mapZoom: selectMapZoom,
    mapType: selectMapType,
    mapWidget: selectMapWidget,
    locationValue: selectLocationValue,
    searchValue1: selectSearchValue1,
    searchTerms : selectSearchTerms
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    setMapWidget: (mapWidget) => {
       dispatch(setMapWidget(mapWidget));
    }
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapItem);