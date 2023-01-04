import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import modalReducer from './modalReducer';
import workareaReducer from './workareaReducer';
import {entities} from './entities';
import messageReducer from './messageReducer';
import podReducer from './podReducer';
import directMessageReducer from './directMessageReducer';


let enhancer;

//need to add entities as a key 
export const rootReducer = combineReducers({
    workarea: workareaReducer,
    messages: messageReducer,
    pods: podReducer,
    directMessages: directMessageReducer,
    session,
    errors: {},
    ui: {
        filters:{},
        modal: modalReducer
    }
})

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadState = {}) => {
    return createStore(rootReducer, preloadState, enhancer)
}

export default configureStore
