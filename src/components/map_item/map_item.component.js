import React, { Component, createRef } from 'react'

import {GOOGLE_MAP_API_KEY} from '../../utilities/utilities.config';

class MapItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.googleMapRef = React.createRef();
    }
    componentDidMount() {
        const googleMapScript = document.createElement("script");
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener("load", () => {
            this.googleMap = this.createGoogleMap();
            this.marker = this.createMarker();
        });
    }
    createGoogleMap = () =>
        new window.google.maps.Map(this.googleMapRef.current, {
            zoom: 16,
            center: { lat: 30.266666, lng: -97.733330 },
            disableDefaultUI: true
        });
    createMarker = () =>
        new window.google.maps.Marker({
            position: { lat: 30.266666, lng: -97.733330},
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