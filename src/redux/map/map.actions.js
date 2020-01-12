import { MapActionTypes } from './map.types';

export const addTerm = term => ({
    type: MapActionTypes.ADD_TERM,
    payload: term
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

