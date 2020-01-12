import { combineReducers } from 'redux';

//reducers
import userReducer from './user/user.reducer';
import mapReducer from './map/map.reducer';

const rootReducer = combineReducers(
    {
        user: userReducer,
        map: mapReducer
    }
);

export default rootReducer;