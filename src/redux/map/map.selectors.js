import { createSelector } from 'reselect';

//input selector

const selectMap = state => state.map;
export const selectSearchFlag = createSelector(
    [selectMap],
    map => map.search_flag
);
export const selectSearchResults = createSelector(
    [selectMap],
    map => map.search_results
);
export const selectSearchTerms = createSelector(
    [selectMap],
    map => map.search_terms
);
export const selectSearchValue1 = createSelector(
    [selectMap],
    map => map.search_value1
);
export const selectSearchValue2 = createSelector(
    [selectMap],
    map => map.search_value2
);
export const selectLocationValue = createSelector(
    [selectMap],
    map => map.location_value
);
export const selectLocationList = createSelector(
    [selectMap],
    map => map.location_list
);
export const selectMapZoom = createSelector(
    [selectMap],
    map => map.zoom
);
export const selectMapType = createSelector(
    [selectMap],
    map => map.map_type

);

