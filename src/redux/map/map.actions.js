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
export const clearSearchResults = () => ({
    type: MapActionTypes.CLEAR_SEARCH_RESULTS
});

export const addTerm = term => ({
    type: MapActionTypes.ADD_TERM,
    payload: term
});
export const clearTerms = () => ({
    type: MapActionTypes.CLEAR_TERMS
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

