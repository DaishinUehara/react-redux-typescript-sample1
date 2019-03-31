import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from './store';
import { Sample1Actions } from './Sample1Actions';
import { Sample1Component } from './Sample1Component';

export interface Sample1Actions {
  updateButtonClick: (v: string) => Action<string>;
  changeInputText: (v: string) => Action<string>;
}

function mapDispatchToProps(dispatch: Dispatch<Action<String>>) {
  return {
    updateButtonClick: (v: string) => dispatch(Sample1Actions.updateButtonClick(v)),
    changeInputText: (v: string) => dispatch(Sample1Actions.changeInputText(v))
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.sample1);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sample1Component);
