import { MapActionTypes } from './map.types';

export const setSearchFlag = (term) => (
    {
        type:MapActionTypes.SET_SEARCH_FLAG,
        payload: term
    }
);

export const clearSearchFlag = () => (
    {
        type:MapActionTypes.CLEAR_SEARCH_FLAG,
    }
);

export const addSearchResult = item => ({
    type: MapActionTypes.ADD_SEARCH_RESULT,
    payload: item
});
// FLAG RESULTS WITH AN ID
export const flagSearchResultsWithDetails = () => ({
    type: MapActionTypes.FLAG_SEARCH_RESULTS_WITH_DETAILS
})
export const addSearchResultDetail = item => ({
    type: MapActionTypes.ADD_SEARCH_RESULT_DETAIL,
    payload: item
});
export const clearSearchResults = () => ({
    type: MapActionTypes.CLEAR_SEARCH_RESULTS,
    search_results_short: [{detail_id:'', detail_flag: false}]
});

export const addTerm = term => ({
    type: MapActionTypes.ADD_TERM,
    payload: term
});
export const clearTerms = () => ({
    type: MapActionTypes.CLEAR_TERMS
});
export const addSearchResultId = id => ({
    type: MapActionTypes.ADD_SEARCH_RESULT_ID,
    payload: id
});
export const clearSearchResultId = () => ({
    type: MapActionTypes.CLEAR_SEARCH_RESULTS_ID_LIST
});

export const setMapWidget = ({mapWidget}) => (
    {
        type: MapActionTypes.SET_MAP_WIDGET,
        payload: mapWidget 
    }
);

export const setSearchValue1 = searchValue => (
    {
        type:MapActionTypes.SET_SEARCH_VALUE1,
        payload: searchValue
    }
);
export const setSearchValue2 = searchValue => (
    {
        type:MapActionTypes.SET_SEARCH_VALUE2,
        payload: searchValue
    }
);
export const setSearchValue3 = searchValue => (
    {
        type:MapActionTypes.SET_SEARCH_VALUE3,
        payload: searchValue
    }
);
export const setLocationValue = locationValue => (
    {
        type:MapActionTypes.SET_LOCATION_VALUE,
        payload: locationValue
    }
);
export const addLocationValue= location => ({
    type: MapActionTypes.ADD_LOCATION_VALUE,
    payload: location
});

