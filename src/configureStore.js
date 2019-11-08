
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import { routerMiddleware } from 'react-router-redux'
import history from './history';
const myRouterMiddleware = routerMiddleware(history);
const buildStore = () => {
    const middlewares = [thunkMiddleware]
    let composeEnhancer = compose
    if (process.env.NODE_ENV === 'development') {
        middlewares.push(createLogger())
        composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    }

    return createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares, myRouterMiddleware)))
}

export default function () {
    if (window.store === undefined) {
        window.store = buildStore()
        return window.store
    }
    if (process.env.NODE_ENV === 'development') {
        window.store.replaceReducer(rootReducer)
    }
    return window.store
}
