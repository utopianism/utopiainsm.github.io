var store = [{
        "title": "如何在 Atom 和 WebStorm 上配置 React Native 的代码编辑环境",
        "excerpt":"针对 React Native 的项目，这里主要介绍什么是 Eslint 和 Flow ，以及在 Atom 和 WebStorm 上如何配置它们。完整详细的配置可参考这个项目：RN_BoilerplateEslintEslint 作为静态代码检查工具，在团队代码中可以起到统一代码风格的作用，同时会适当降低代码编写过程中出现的一些非必要性错误。ESLint 官方网站上的介绍： JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript 代码错误通常需要在执行过程中不断调适。像 ESLint 这样的可以让程序员在编码的过程中发现问题而不是在执行的过程中。 ESLint 的初衷是为了让程序员可以创建自己的检测规则。ESLint 的所有规则都被设计成可插入的。ESLint 的默认规则与其他的插件并没有什么区别，规则本身和测试可以依赖于同样的模式。为了便于人们使用，ESLint 内置了一些规则，当然，你可以在使用过程中自定义规则。http://eslint.cn/docs/about/由于 ESLint 的灵活可配置，我们这里采用的是 airbnb 的 ESLint 规范并添加自己的配置，在当前 React Native 项目下打开终端，使用 npm i -D 或 yarn add -D 安装 babel-eslint eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react 这些依赖库。在当前项目路径下创建 .eslintrc...","categories": ["React-Native"],
        "tags": ["React-Native","React","JavaScript"],
        "url": "http://oopsgogo.com/react-native/2018/01/02/config-react-native-at-Atom-and-WebStorm.html",
        "teaser":null},{
        "title": "Flow 在 React Native 项目上的一些细节实践",
        "excerpt":"阅读本文前，需要您具备 Redux Redux-Thunk Redux-Saga 的基础知识。本文主要关注以下几个点： Flow 在常用组件上的使用 Flow 在 Redux Redux-Thunk 项目上的使用 Flow 在 Redux Redux-Saga 项目上的使用这篇文章的所有代码都在 RN_Boilerplate 上。Flow 在常用组件上的使用React 的 Functional 组件如果不用 Flow 的话是这样的：import * as React from 'react';import { View } from 'react-native';const Container = (props) =&gt; { return ( &lt;View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center',...","categories": ["React-Native"],
        "tags": ["Flow","React-Native","React","JavaScript"],
        "url": "http://oopsgogo.com/react-native/2018/01/06/flow-type-at-react-native-project.html",
        "teaser":null}]
