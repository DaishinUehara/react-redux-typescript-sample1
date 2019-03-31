# React-Redux-Typescriptのサンプルを置きます

## 環境構築

### 前提条件

すでにパスなどは通っておりnodeやnpm、yarnは導入済みとします。

### 手順

このフォルダは以下のようにして作成されています。

1. $ yarn create react-app react-redux-typescript-sample1 --typescript
1. $ cd react-redux-typescript-sample1
1. $ yarn add redux react-redux
1. $ yarn add --dev @types/react-redux

### 最初の動作確認

  $ yarn start

問題がなければブラウザが起動しReactのロゴが表示される。

## 最初の画面

最初の画面を考えてみましょう。
イメージとしてはtextboxがあり値をいれます。
ボタンをクリックすることでtextboxの中身がその下に反映されます。

## イベントを発生させる

まず最初におこなうことはイベントを定義することです。


```bash
touch Sample1Actions.ts
```

必要なイベントはボタンクリックと、テキストボックスのチェンジイベントです。
(テキストボックスに値を入力してもstoreに反映させないと、テキストボックスの値は変わりません)

```javascript
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const Sample1Actions = {
  updateButtonClick: actionCreator<string>('UPDATE_BUTTON_CLICK'),
  changeInputText: actionCreator<string>('CHANGE_INPUT_TEXT')
};
```

## 発生したイベントをReducerで処理する

```bash
touch Sample1State.ts
```

ここではStateの中で、初期状態とstateを処理するReducerも記述しています。

```javascript
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
```

## storeの作成

storeを作成します。storeはreducerで生成したstateが保存される場所です。

```bash
touch store.ts
```

以下のように編集します。

```javascript
import { createStore, combineReducers } from 'redux';
import { Sample1Reducer, Sample1State } from './Sample1State';

export type AppState = {
  sample1: Sample1State
};

const store = createStore(
  combineReducers<AppState>({
    sample1: Sample1Reducer
  })
);

export default store;
```

## コンテナの実装

storeに保存された変更はコンテナに反映されます。そのコンテナを実装します。

```bash
touch Sample1Container.ts
```

```javascript
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
```

## コンポーネントの作成

イベントを発行したり、stateから値を受け取りhtmlを生成するコンポーネントを作成します。

```bash
touch Sample1Component.tsx
```

Sample1Component.tsxの中身は以下のようにします。

```javascript
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
```

## タグの作成

作成したコンポーネントとコンテナを一つにまとめReact.Componentとします。

```bash
touch Sample1.tsx
```

```javascript
import * as React from 'react';
import Sample1Container from '../src/Sample1Container';

class Sample1 extends React.Component {
  render() {
    return (
      <div className="Sample1">
        <Sample1Container />
      </div>
    );
  }
}

export default Sample1;
```

これで一通りアクション発行からイベントを発行し、Reducerでstateを書き換え、
stateをstoreに反映させstoreからコンテナを経由してコンポーネントを再描画する処理を記述しました。

## 組み込み

作成したコンポーネントを

inex.tsxの中身を以下のように書き換えます。

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Sample1 from './Sample1';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Sample1 />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## 動作確認

早速以下のurlにアクセスしてみましょう。

http://localhost:3000

「このサイトにアクセスできません」とでてきたらサーバが起動していませんので以下のようにして再度起動してみてください。

```bash
yarn start
```

うまく表示できたでしょうか。
テキストボックスの中に文字を入力し「反映」ボタンを押すと、
テキストボックスの下に入力した文字が出力されます。
