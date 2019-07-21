import { combineReducers } from 'redux';

import { canvasActionReducer } from './CanvasReducer';

export const rootReducer = combineReducers({
  canvas: canvasActionReducer,
});