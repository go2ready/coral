import { CanvasManager } from '../CanvasManager';
import { RootState } from '../../types/Index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { CanvasAction } from '../../reducers/CanvasReducer';
import { setShouldSubmit } from '../../actions/CanvasAction';

export function mapStateToProps(state: RootState) {
  const { canvas: { shouldSubmit }} = state;
    return {
      shouldSubmit,
    }
  }

export function mapDispatchToProps(dispatch: Dispatch<CanvasAction>) {
  return {
    setShouldSubmit: (shouldSubmit: boolean) => dispatch(setShouldSubmit(shouldSubmit)),
  }
}

export const CanvasManagerContainer = connect(mapStateToProps, mapDispatchToProps)(CanvasManager);