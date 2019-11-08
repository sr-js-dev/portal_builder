import { combineReducers, createStore } from 'redux'

import auth from './auth'
import common from './common'

const reducers = combineReducers({
  auth,
  common
})

export const store = createStore(reducers);
export default reducers
