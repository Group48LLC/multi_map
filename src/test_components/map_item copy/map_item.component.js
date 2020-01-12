import React, { Component } from 'react'

import { GOOGLE_MAP_API_KEY } from '../../firebase/firebase.config';

class MapItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.googleMapRef = React.createRef();
        this.zoom = 16;
        this.center = { lat: 30.266666, lng: -97.733330 };
        this.markerPosition = { lat: 30.266666, lng: -97.733330 };
        this.searchRequest = {
            query: 'Mckinney Falls State Park',
            fields: ['name', 'geometry']
        };
    }

    componentDidMount() {
        // 
        // 
        const googleMapScript = document.createElement("script");
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
        window.document.body.appendChild(googleMapScript);
        
        console.log("HEY YOU");
        console.log(window.google);

        var mapp = new window.google.maps.Map(this.googleMapRef.current, {
            zoom: this.zoom,
            center: this.center,
            disableDefaultUI: true
        });
        var markerr = new window.google.maps.Marker({
            position: this.markerPosition,
            map: this.googleMap
        });

        var testSearchRequest = {
            query: 'Mckinney Falls State Park',
            fields: ['name', 'geometry']
        };

        
        if (testSearchRequest) {
            const placesService = new window.google.maps.places.PlacesService(map);
          placesService.findPlaceFromQuery(testSearchRequest, function (results, status) {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        this.createMarker(results[i]);
                    }
                    if (results.length > 0) {
                        this.googleMap.setCenter(results[0].geometry.location)
                    }
                }
            }) 
           
           //console.log(placesService);
        }

    }

    componentDidMount2() {
        const googleMapScript = document.createElement("script");
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener("load", () => {
            this.googleMap = this.createGoogleMap();
            this.marker = this.createMarker();
        });

        var testSearchRequest = {
            query: 'Mckinney Falls State Park',
            fields: ['name', 'geometry']
        };

        
        if (testSearchRequest) {
            const placesService = new window.google.maps.places.PlacesService(this.googleMap);
          placesService.findPlaceFromQuery(testSearchRequest, function (results, status) {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                   /* for (var i = 0; i < results.length; i++) {
                        this.createMarker(results[i]);
                    }
                    */
                    if (results.length > 0) {
                        this.googleMap.setCenter(results[0].geometry.location)
                    }
                }
            }) 
           
           //console.log(placesService);
        }
        

    }

    createGoogleMap = () => {
        new window.google.maps.Map(this.googleMapRef.current, {
            zoom: this.zoom,
            center: this.center,
            disableDefaultUI: true
        });

    }
    createMarker = () =>
        new window.google.maps.Marker({
            position: this.markerPosition,
            map: this.googleMap
        });

    render() {
        return (
            <div
                id="google-map"
                ref={this.googleMapRef}
                style={{ width: '100%', height: '100%' }}
            />
        )
    }
}

export default MapItem;