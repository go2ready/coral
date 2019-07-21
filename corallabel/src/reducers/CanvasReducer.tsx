import { ActionType, getType } from 'typesafe-actions'
import { ICanvasState } from '../types/CanvasState'

import * as canvasAction from '../actions/CanvasAction'
export type CanvasAction = ActionType<typeof canvasAction>

export function canvasActionReducer(state: ICanvasState | undefined, action: CanvasAction){
  if (state === undefined)
  {
    state = {
      shouldSubmit: false,
    }
  }

  switch (action.type) {
    case getType(canvasAction.setShouldSubmit):
      return { ...state,
        shouldSubmit: action.payload.shouldSubmit,
      };
    default:
      return state;
  }
}