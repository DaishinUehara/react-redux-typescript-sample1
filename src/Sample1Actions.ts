import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const Sample1Actions = {
  updateButtonClick: actionCreator<string>('UPDATE_BUTTON_CLICK'),
  changeInputText: actionCreator<string>('CHANGE_INPUT_TEXT')
};
