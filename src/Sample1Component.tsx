import React from 'react';
import { Sample1State } from './Sample1State';
import { Sample1Actions } from './Sample1Container';

interface OwnProps {};

type Sample1Props = OwnProps &  Sample1State & Sample1Actions

export const Sample1Component: React.SFC<Sample1Props> = (props: Sample1Props) => {
  return (
    <div className="Sample1">
      <form>
        <input type="text" value={props.inputtext} onChange={(e) => props.changeInputText(e.target.value)}/>
        <input type="button" value="反映" onClick={ (e) =>props.updateButtonClick(props.inputtext)}/>
        <div>{props.divtext}</div>
      </form>
    </div>
  );
}

export default Sample1Component;
