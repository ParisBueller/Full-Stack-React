import { combineReducers } from 'redux';
import  authReducer  from '../reducers/authReducer';

//whatever keys we provide to the combineReducers object
//are going to represent the keys that exist inside of our state object
export default combineReducers({
    auth: authReducer
});