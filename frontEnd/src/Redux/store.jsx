import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import {homeReducer} from './reducer'
// import { AddCommentReducer } from './AddcommentReducer/AddCommentReducer';
const rootReducer = combineReducers({
    homeReducer
})

const composedEnhancer =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const enhancer = composedEnhancer(applyMiddleware(thunk))
export const store = createStore(rootReducer, enhancer)
