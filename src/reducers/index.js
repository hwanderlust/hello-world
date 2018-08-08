import { combineReducers } from 'redux';
import manageApp from './manageApp'
//import top level reducers

const rootReducer = combineReducers({
  //your reducers here
  appState: manageApp
})

export default rootReducer;
