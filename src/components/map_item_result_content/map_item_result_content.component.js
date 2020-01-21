import React from 'react';

import './map_item_result_content.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {  } from '../../redux/map/map.selectors';


const MapItemResultContent = ({item: { name }}) => {
    
    return(
        <div>
            Content...{name}
        </div>
    );
}
const mapStateToProps = createStructuredSelector(
    {
        
    }
)

export default connect(mapStateToProps)(MapItemResultContent);