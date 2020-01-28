import { MapActionTypes } from './map.types';
import { addSearchToResults, addToSearchResultsDetailed, addSearchIdToList, flagResults, flagDetail } from './map.utils';

const INITIAL_STATE = {
    search_flag:0,
    search_value1: '',
    search_value2: '',
    search_terms:[],
    location_list:[],
    zoom: 11,
    map_type: 'roadmap',
    location_value: '',
    search_results_short:[],
    search_results_detailed: [],
    search_results_id_list: []
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
        case MapActionTypes.TOGGLE_SHOW_DETAILS:{
            return{
                ...state,
                search_results_short: flagDetail(state.search_results_short, action.payload)
            }
        }
        case MapActionTypes.ADD_SEARCH_RESULT:
            // if (state.search_results_short.length < 15 ) {
                return {
                    ...state,
                    search_results_short: addSearchToResults(state.search_results_short, action.payload)
                }
            // } else {
            //     return {
            //         ...state,
            //     }
            // }
        case MapActionTypes.FLAG_SEARCH_RESULTS_WITH_DETAILS:
            return {
                ...state,
                search_results_short: flagResults(state.search_results_short, state.search_results_detailed)
            }
        case MapActionTypes.ADD_SEARCH_RESULT_DETAIL:
            return {
                ...state,
                search_results_detailed: addToSearchResultsDetailed(state.search_results_detailed, action.payload)
            }
        case MapActionTypes.ADD_SEARCH_RESULT_ID:
            return {
                ...state,
                search_results_id_list: addSearchIdToList(state.search_results_id_list, action.payload)
            }
        case MapActionTypes.CLEAR_SEARCH_RESULTS_ID_LIST:
            return {
                ...state,
                search_results_id_list:[]
        }
        case MapActionTypes.CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                search_results_short:[]
        }
        case MapActionTypes.CLEAR_SEARCH_RESULTS_DETAILS:
            return {
                ...state,
                search_results_detailed:[]
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