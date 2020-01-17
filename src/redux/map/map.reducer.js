import { MapActionTypes } from './map.types';
import { addSearchToResults } from './map.utils';
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
    search_results:[
        {
            name:'test1',
            id:'123456',
            formatted_address:'123 cherry lane'
        }
    ]
}


const mapReducer = ( state = INITIAL_STATE, action ) => {
    console.log('FIRE ===> mapReducer PAYLOAD---> ' + action.type +'---'+ action.payload)
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
            if (state.search_results.length < 20 ) {
                return {
                    ...state,
                    search_results: addSearchToResults(state.search_results, action.payload)
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