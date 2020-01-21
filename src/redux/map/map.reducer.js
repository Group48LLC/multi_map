import { MapActionTypes } from './map.types';
import { addSearchToResults, addToSearchResultsDetailed } from './map.utils';
//import {addTermToTerms} from './map.utils';

const INITIAL_STATE = {
    search_flag:0,
    search_value1: '',
    search_value2: '',
    search_terms:[],
    location_list:[],
    zoom: 13,
    map_type: 'roadmap',
    location_value: '',
    search_results_short:[
        {
            name:'test1',
            id:'123456',
            formatted_address:'123 cherry lane',
            photo: 'TEST-PHOTO',
            price_level: '$',
            rating:'',
            user_ratings_total: 0,
            // opening_hours: [],
            // reviews: [],
            // url: ''
        }
    ],
    search_results_detailed :[]
}


const mapReducer = ( state = INITIAL_STATE, action ) => {
    console.log('FIRE ===> mapReducer PAYLOAD---> ' + JSON.stringify(action.type +'---'+ action.payload, null, 2))
    switch (action.type) {
        
        case MapActionTypes.CLEAR_SEARCH_FLAG:{
            return{
                ...state,
                search_flag: 0
            }
        }

        case MapActionTypes.SET_SEARCH_FLAG:{
            return{
                ...state,
                search_flag: action.payload
            }
        }

        case MapActionTypes.ADD_SEARCH_RESULT:
            if (state.search_results_short.length < 15 ) {
                return {
                    ...state,
                    search_results_short: addSearchToResults(state.search_results_short, action.payload)
                }
            } else {
                return {
                    ...state,
                }
            }
            case MapActionTypes.ADD_SEARCH_RESULT_DETAIL:
                return {
                    ...state,
                    search_results_detailed: addToSearchResultsDetailed(state.search_results_detailed, action.payload)
                }

        case MapActionTypes.CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                search_results_short:[]
        }
        case MapActionTypes.ADD_TERM:
            return {
                ...state,
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
            
        case MapActionTypes.SET_SEARCH_VALUE3:
                return {
                    ...state,
                    search_value3: action.payload
                }

        case MapActionTypes.SET_LOCATION_VALUE:
            return {
                ...state,
                location_value: action.payload
            }

        case MapActionTypes.ADD_LOCATION_VALUE:
            return {
                ...state,
            // create utility function
            location_list:[...state.location_list, action.payload]
            }
        default:
            return state;
    }
};

export default mapReducer;