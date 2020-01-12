import { MapActionTypes } from './map.types';
//import {addTermToTerms} from './map.utils';

const INITIAL_STATE = {
    search_value1: '',
    search_value2: '',
    search_terms:[],
    zoom: 13,
    map_type: 'roadmap',
    place_id: '',
    place_formatted: '',
    location_value: '',
    map_widget:[{}]
}


const mapReducer = ( state = INITIAL_STATE, action ) => {
    console.log('PAYLOAD---> ' + action.type +'---'+ action.payload)
    switch (action.type) {
        case MapActionTypes.SET_MAP_WIDGET:
            console.log('SET_MAP_WIDGET  PAYLOAD---> ' + action.payload)
            return {
                ...state,
                map_widget: action.payload,
            }
        case MapActionTypes.ADD_TERM:
            return {
                ...state,
                // terms:addTermToTerms(state.terms, action.payload)
                search_terms:[...state.search_terms, action.payload]
            }
        case MapActionTypes.SET_SEARCH_VALUE1:
            return {
                ...state,
                search_value1: action.payload
            }
        case MapActionTypes.SET_SEARCH_VALUE2:
            return {
                ...state,
                search_value2: action.payload
            }
            case MapActionTypes.SET_LOCATION_VALUE:
                return {
                    ...state,
                    location_value: action.payload
                }
        default:
            return state;
    }
};

export default mapReducer;