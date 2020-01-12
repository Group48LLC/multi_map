import React from 'react';

import './map_item2.styles.scss';

import { GOOGLE_MAP_API_KEY } from '../../firebase/firebase.config';



class MapItem extends React.Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
    
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById('map'),
      this.props.options);
    this.props.onMapLoad(map)
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div style={{ width: 500, height: 500 }} id='map'/>
    );
  }
}

export default MapItem;