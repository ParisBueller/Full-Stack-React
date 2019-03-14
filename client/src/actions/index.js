import axios from 'axios';

import { FETCH_USER } from './types';
//fetch our current user
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')

    dispatch({ type: FETCH_USER, payload: res.data });
};
//handle our stripe api token 
export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    //history.push redirects us from surveyFormReview back to /surveys
    history.push('/surveys')
    dispatch({ type: FETCH_USER, payload: res.data });
};
