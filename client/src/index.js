import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';


import App from './components/App';
import reducers from './reducers';
//development only axios helper!
import axios from 'axios';
window.axios = axios;

//create a new instance of our redux-store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    //provider is a React component that knows how to 
    //read changes from our redux-store so ALL child components
    //will be continuously updated with our new state
<Provider store={store}>
    <App />
</Provider>, 
document.querySelector('#root')
);