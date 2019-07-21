import { createAction } from 'typesafe-actions'
import { ICanvasState } from '../types/CanvasState';

export const setShouldSubmit = createAction('canvas/SET_SHOULD_SUBMIT', resolve => {
  return (shouldSubmit : boolean) => resolve({ shouldSubmit } as ICanvasState);
});