import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Sample1Actions } from './Sample1Actions';


export interface Sample1State {
  inputtext: string;
  divtext: string;
}

const initialState: Sample1State = {
  inputtext: '',
  divtext: ''
};


export const Sample1Reducer = reducerWithInitialState(initialState)
  .case(Sample1Actions.updateButtonClick, (state, divtext) => {
    console.log('updateButtonClick divtext:' + divtext);
    return Object.assign({}, state, { divtext })
  })
  .case(Sample1Actions.changeInputText, (state, inputtext) => {
    console.log('changeInputText inputtext:' + inputtext);
    return Object.assign({}, state, { inputtext });
  });
