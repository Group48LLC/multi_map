import React from 'react';

import './map_item_result_content.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSearchResults, selectSearchResultsDetailed } from '../../redux/map/map.selectors';


// const MapItemResultContent = ({item: { detail_id }}) => {
class MapItemResultContent extends React.Component  {
//     "formatted_address": "1480 Grand Blvd, Kansas City, MO 64106, USA",
//    "formatted_phone_number": "(816) 421-1149",
//    "id": "28ea22fe7c0c054b23cb86c2303403e6b9083460",
//    "name": "Power Life Yoga Barre Fitness",
//    reviews = []
    name = '';
    formatted_address = '';
    formatted_phone_number = '';
    id = '';
    reviews = [];
    
    buildDetails= () => {
        const {detail_id, searchResultsDetailed} = this.props;
        for(let i = 0; i < searchResultsDetailed.length; i++){
            if(searchResultsDetailed[i].id === detail_id){
                console.log('buildDetail() FIRE detailState ===> '+ JSON.stringify(searchResultsDetailed[i], null, 3))
                this.name = searchResultsDetailed[i].name;
                this.formatted_address = searchResultsDetailed[i].formatted_address;
                this.formatted_phone_number = searchResultsDetailed[i].formatted_phone_number;
                this.id = searchResultsDetailed[i].id;
                this.reviews = searchResultsDetailed[i].reviews;
            }
        }
    }

    componentDidUpdate() {
        
    }

    render(){
    const {detail_id} = this.props;
    this.buildDetails();
        return(
            <div>
                {
                detail_id
                ? <div>
                    <p>{this.name} | </p>
                    <p>{this.formatted_address} | </p>
                    <p>{this.formatted_phone_number} | </p>
                    <p> {this.id}</p>
                    {/* <ul>
                        <li>{this.reviews[0].author_name} said</li>
                        <li>"{this.reviews[0].text}"</li>
                        <li>Customer Rating: {this.reviews[0].rating}</li>
                    </ul>
                    <ul>
                        <li>{this.reviews[1].author_name} said </li>
                        <li>"{this.reviews[1].text}"</li>
                        <li>Customer Rating: {this.reviews[1].rating}</li>
                    </ul> */}
                </div>
                : <div></div>
                }
            </div>
        );
    }
}
const mapStateToProps = createStructuredSelector(
    {
        searchResults: selectSearchResults,
        searchResultsDetailed: selectSearchResultsDetailed
    }
)

export default connect(mapStateToProps)(MapItemResultContent);