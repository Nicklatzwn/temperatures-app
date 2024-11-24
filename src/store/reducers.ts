import { combineReducers } from 'redux';
import { temperaturesReducer } from './temperatures';

/**
 * Root reducer for the Redux store.
 *
 * This combines all individual reducers into a single root reducer
 * for managing the overall state of the application. Currently,
 * it includes the temperatures slice for handling temperatures-related state.
 *
 * @constant {Function} rootReducer
 */
const rootReducer = combineReducers({
  temperatures: temperaturesReducer,
});

/**
 * Exports the root reducer for use in the Redux store.
 *
 * @returns {Function} The combined reducer function.
 */
export default rootReducer;
