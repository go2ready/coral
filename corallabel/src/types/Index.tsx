import { ActionType, StateType } from 'typesafe-actions';

// Root reducer
import { rootReducer } from '../reducers/Index';

// Actions
import { CanvasAction } from '../reducers/CanvasReducer'

// Root state of the app
export type RootState = StateType<typeof rootReducer>;

// Root actions
export type RootAction = CanvasAction;