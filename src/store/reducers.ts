import { combineReducers } from 'redux';
import { temperaturesReducer } from './temperatures';

const rootReducer = combineReducers({
  temperatures: temperaturesReducer,
});

/**
 * Exports the root reducer for use in the Redux store.
 *
 * @returns {Function} The combined reducer function.
 */
export default rootReducer;
