import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import  authReducer  from '../reducers/authReducer';
import surveysReducer from '../reducers/surveysReducer';

//whatever keys we provide to the combineReducers object
//are going to represent the keys that exist inside of our state object
export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
});