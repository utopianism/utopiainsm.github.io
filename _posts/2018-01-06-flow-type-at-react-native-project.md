---
title:  "Flow 在 React Native 项目上的一些细节实践"
categories: 
  - React-Native
tags:
  - Flow
  - React-Native
  - React
  - JavaScript
---

阅读本文前，需要您具备 [Redux](https://redux.js.org/docs/introduction/) [Redux-Thunk](https://github.com/gaearon/redux-thunk) [Redux-Saga](https://github.com/redux-saga/redux-saga) 的基础知识。本文主要关注以下几个点：

* Flow 在常用组件上的使用
* Flow 在 Redux Redux-Thunk 项目上的使用
* Flow 在 Redux Redux-Saga 项目上的使用

这篇文章的所有代码都在 [RN_Boilerplate](https://github.com/utopianism/RN_boilerplate) 上。

## Flow 在常用组件上的使用
React 的 Functional 组件如果不用 Flow 的话是这样的：

```react
import * as React from 'react';
import { View } from 'react-native';

const Container = (props) => {
  return (
    <View
      style={[{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }, props.style]
    }
    >
      {props.children}
    </View>
  );
};

export { Container };
```
这里的 Container 包含两个 props: `style` 和 `children`, 很明显如果没有统一定义组件的 props， 调用时需要在组件里查看是不是有相关类型，如果组件代码比较多，不利于查看组件 props。
利用 Flow 的类型注解，Container 的代码变成了这样：

```react
// @flow

import * as React from 'react';
import { View } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
  children?: React.Node,
  style?: StyleObj;
};

const Container = (props: Props) => {
  return (
    <View
      style={[{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }, props.style]
    }
    >
      {props.children}
    </View>
  );
};

export { Container };

```

Flow 对 Functional 组件的 props 做了注解，因为 `style` 和 `children` 在调用时都可以不提供，所以用 `?` 表示 props 为可选。

对于 Class 组件，因为 Class 里面可能会带有 state，所以 React 的 Class 组件一般是需要对 Props 和 State 进行类型说明 `React.Component<Props, State>`。

如果 Props 需要有默认值，则需要在组件内重写 React 的 `static defaultProps`:

```react
  static defaultProps = {
	 ...
  };
```
如果 State 需要有默认值，则需要在组件内重写 React 的 `state`:

```react
  state = {
	 ...
  };
```

下面是一个在 Class 组件上使用 Flow 的完整例子：


```react
// @flow

import * as React from 'react';
import { Text } from 'react-native';

type Props = {
   defaultCount: number;
}

type State = {
  count: number;
}

let timer = 0;

class Count extends React.Component<Props, State> {
  static defaultProps = {
    defaultCount: 5,
  };

  state = {
    count: this.props.defaultCount,
  };

  componentDidMount() {
    timer = setInterval(() => {
      this.setState(prevState => ({
        count: prevState.count + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  render() {
    return (
      <Text>Count: {this.state.count}</Text>
    );
  }
}

export { Count };

```


## Flow 在 Redux Redux-Thunk 项目上的使用

Flow 对第三方库的类型检查支持的不是很友好，Flow 提供了一个 [flow-typed](https://github.com/flowtype/flow-typed) 用来专门给第三方库进行类型定义。需要在本地安装 flow-type: `yarn global add flow-typed`，安装完后打开到项目路径执行：`flow-typed install` 添加 Redux Redux-Thunk 及其他第三方的类型定义到项目中。

Flow 的类型检查对 Redux 项目好处在与：

* 可以校验检查 Actions 的类型是否符合
* 在 `mapStateToProps` 校验 state 是否符合定义内的类型，这个校验检查是非常实用的一个点，因为如果没有使用 Flow，而项目上的 Reducers 又非常多的情况下，很容易写错 Reducer 的名称，只能在运行时跑出错误来。

下面具体看下在项目中怎么运用 Flow:

### Actions
Actions 只需把所用的 Action 类型统一写在一处，并且用 `|`（ disjoint unions ）符号统一。

```react
export type Action =
{ type: 'FETCH_DATA_START' } |
{ type: 'FETCH_DATA_SUCCESS', payload: dataType } |
{ type: 'FETCH_DATA_FAIL' }
;
```

在创建 Action function 的时候，只需对返回值用 `ThunkAction` 进行类型声明就行。（此处的 ThunkAction 定义放在了 `Store.js` 上） 

### Reducers
Reducers 需要对 state 和 action 做类型说明：

```react
// @flow

import type { Action } from '../types/Action';

export type dataType = Array<{ name: string, age: number }>;

type State = {
  data: dataType,
  dataFetched: boolean,
  isFetching: boolean,
  error: boolean,
}

const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false,
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'FETCH_DATA_START':
      return {
        ...state,
        data: [],
        isFetching: true,
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case 'FETCH_DATA_FAIL':
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

```
在 reducers 文件夹下的 index.js 中需要统一所有的 reducer, 要把所有 reducers 的类型导出，使用 Flow 的 `typeof`：

```react
// @flow

import FetchDataReducer from './FetchDataReducer';

const reducers = {
  fetchDataReducer: FetchDataReducer,
};

export type Reducers = typeof reducers;

export default reducers;

```

### State
State 的类型主要在 Redux `connect` 组件时使用， State 的类型如下：

```react
// @flow

import type { Reducers } from '../reducers';

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

export type State = $ObjMap<Reducers, $ExtractFunctionReturn>;

```

### Store

Redux-Thunk 的引入，使得 Action 在创建的时候会有 (dispatch, state) 的传入，Flow 需要对此做注解:


```react
// @flow

import type {
  /* eslint-disable import/named */
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
} from 'redux';
import type { Action } from './Action';
import type { State } from './State';

export type Store = ReduxStore<State, Action>;

export type GetState = () => State;

export type Dispatch = ReduxDispatch<Action> & Thunk<Action>;

export type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => A;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

```

相关代码可查看 [RN_Boilerplate](https://github.com/utopianism/RN_boilerplate) 的 `master` 分支。

## Flow 在 Redux Redux-Saga 项目上的使用

Redux-Saga 在项目中使用 Flow 比 Redux-Thunk 会更加简单一些，Actions Reducers   Store State 这些类型注解和上面的完全一样就行，主要是对 sagas 下的 saga 相关代码要做一些类型注解。

通过 `flow-typed install redux-saga` 添加 saga 的类型定义，导入 `Saga` 的定义： `import type { Saga } from 'redux-saga';`，然后对 `yield` 的返回进行类型说明：

```react
function* fetchUser():Saga<void> {
  try {
    const p = yield call(getPeople);
    yield put({ type: 'FETCH_DATA_SUCCESS', payload: p });
  } catch (e) {
    yield put({ type: 'FETCH_DATA_FAIL' });
  }
}
```

相关代码可查看 [RN_Boilerplate](https://github.com/utopianism/RN_boilerplate) 上的 `saga` 的分支。



