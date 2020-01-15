import { MapActionTypes } from './map.types';
//import {addTermToTerms} from './map.utils';

const INITIAL_STATE = {
    search_value1: 'gates',
    search_value2: 'yoga',
    search_terms:[],
    zoom: 13,
    map_type: 'roadmap',
    location_value: '',
    search_results:[
        {
            name:'test1',
            id:'123456',
            formatted_address:'123 cherry lane'
        }
    ]
}


const mapReducer = ( state = INITIAL_STATE, action ) => {
    console.log('PAYLOAD---> ' + action.type +'---'+ action.payload)
    switch (action.type) {
        
        case MapActionTypes.ADD_SEARCH_RESULT:
            if (state.search_results.length <10 ) {
                return {
                    ...state,
                    search_results:[...state.search_results, action.payload]
                }
            } else {
                return {
                    ...state,
                }
            }

        case MapActionTypes.CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                search_results:[]
        }
        case MapActionTypes.ADD_TERM:
            return {
                ...state,
                // terms:addTermToTerms(state.terms, action.payload)
                search_terms:[...state.search_terms, action.payload]
            }
        case MapActionTypes.CLEAR_TERMS:
            return {
                ...state,
                search_terms:[]
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