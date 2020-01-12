import React from 'react';

import './map_results.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSearchTerms, selectLocationValue, selectSearchValue1, selectSearchValue2 } from '../../redux/map/map.selectors';


const MapResults = ({ ...props }) => {

    return (
        <div>
            {
                !props.searchTerms.length
                    ? <p>NO TERMS</p>
                    : props.searchTerms
                        .filter((term, index) => index < props.searchTerms.length)
                        .map(term => (
                            <div key={term.id}> {term} </div>
                        ))
            }
            <div>
                <p>{props.locationValue}</p>
                <p>{props.searchValue1}</p>
                <p>{props.searchValue2}</p>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector(
    {
        searchTerms: selectSearchTerms,
        locationValue: selectLocationValue,
        searchValue1: selectSearchValue1,
        searchValue2: selectSearchValue2
    }
)

export default connect(mapStateToProps)(MapResults);