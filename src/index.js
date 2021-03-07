import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import './styles/main.scss';
import App from './components/App';
import reducer from './store/reducers';
import alertReducer from './store/reducers/AlertReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        r_and_m: reducer,
        alertManagement: alertReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));