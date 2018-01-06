---
title:  "如何在 Atom 和 WebStorm 上配置 React Native 的代码编辑环境"
categories: 
  - React-Native
tags:
  - React-Native
  - React
  - javascript

---

针对 React Native 的项目，这里主要介绍什么是 Eslint 和 Flow ，以及在 Atom 和 WebStorm 上如何配置它们。

完整详细的配置可参考这个项目：[RN_Boilerplate](https://github.com/utopianism/RN_boilerplate)

## Eslint

[Eslint](https://eslint.org/) 作为静态代码检查工具，在团队代码中可以起到统一代码风格的作用，同时会适当降低代码编写过程中出现的一些非必要性错误。

ESLint 官方网站上的介绍：
> JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript 代码错误通常需要在执行过程中不断调适。像 ESLint 这样的可以让程序员在编码的过程中发现问题而不是在执行的过程中。

> ESLint 的初衷是为了让程序员可以创建自己的检测规则。ESLint 的所有规则都被设计成可插入的。ESLint 的默认规则与其他的插件并没有什么区别，规则本身和测试可以依赖于同样的模式。为了便于人们使用，ESLint 内置了一些规则，当然，你可以在使用过程中自定义规则。
[http://eslint.cn/docs/about/](http://eslint.cn/docs/about)



由于 ESLint 的灵活可配置，我们这里采用的是 airbnb 的 ESLint 规范并添加自己的配置，在当前 React Native 项目下打开终端，使用 `npm i -D` 或 `yarn add -D` 安装 `babel-eslint eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react` 这些依赖库。

在当前项目路径下创建 .eslintrc 文件，并编辑规则配置：
```json
{
  "extends": "airbnb",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-underscore-dangle": ["error", { "allowAfterThis": true }],
    "no-use-before-define": 0,
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "import/prefer-default-export": 0,
    "arrow-body-style": 0,
    "react/prefer-stateless-function": 0,
    "class-methods-use-this": 0,
    "global-require": 0,
    "no-bitwise": 0,
    "guard-for-in": 0,
    "no-param-reassign": 0,
    "no-restricted-syntax": 0,
    "react/jsx-boolean-value": 0,
    "no-undef": 0,
    "no-console": 0,
    "react/sort-comp": [1, {order: [
                  'type-annotations',
                  'static-methods',
                  'lifecycle',
                  'everything-else',
                  'render',
                  ],
                  }],
   }
}
```


### Eslint 在 Atom 上的配置
1. 在 Atom 上打开 settings,  在 Install 中搜索并安装 `linter-eslint `。
2. 验证 eslint 规则是否生效。在项目路径下新建或打开一个 js 文件，输入：
```javascript
function foo() {
  const bar = 1;
  bar = 2;
}
```
Atom 会提示 `'foo' is defined but never used.` `'foo' is defined but never used.` `'aNum' is constant. ` 这几个错误，因为这里的 ESLint 规定定义的方法或者变量一定要在项目里被使用，否则报错；constant 定义之后不能更改它的值。
3. Atom 可以设置成保存时修复简单的 ESLint 错误。类似空格，空行如果不按规则，保存时会自动修复，这个功能非常实用。在 Settings -> Install -> Linter Eslint 上将 Fix erros on save 打开就行。


### Eslint 在 WebStorm 上的配置

1. WebStorm 打开项目后，在 Preferences -> Languages & Frameworks -> JavaScript -> Code quality tools -> ESLint 上将 Enable 勾上，指定 Eslint package 为当前项目路径下的 node_modules/eslint 。
2. 验证 eslint 规则是否生效。在项目路径下新建或打开一个 js 文件，输入：
```javascript
function foo() {
  const bar = 1;
  bar = 2;
}
```
3. WebStorm 不能在保存时修复一些简单的规则错误（如果你知道怎么实现，请告诉我），但是可以通过设定快捷键运行 eslint 的自动修复。打开 Preferences -> Tools -> External tools，点击 + 按钮新建一个新的外部工具，命名为 ESLint Fix，按照下图配置此工具的参数：

![eslint-fix-config-at-webstorm]({{ "/assets/eslint-fix-config-at-webstorm.png" | absolute_url }})

设置完后，可以给 ESLint Fix 设置个快捷键，通过快捷键也可以实现类似 Atom 的自动修复功能：
![flow-config-at-webstorm]({{ "/assets/eslint-fix-keymap-setting.png" | absolute_url }})

## Flow
[Flow](https://flow.org/) 是 Facebook 推出的一个静态类型检查工具，可以在编写代码的时候对代码进行类型核对检查，减少 bug 的出现。

使用 `npm i -D` 或 `yarn add -D` 安装 `flow-bin`，为了确保 Flow 的服务能正常启动运行，必现保证项目里面 package.json 里的 flow-bin 版本和项目路径下 .flowconfig 文件里面的配置版本统一。

例如在 React Native 0.50.4 的版本中 .flowconfig 里面的版本信息是 ^0.56.0，则安装 flow-bin 指定版本安装： `yarn add -D flow-bin@0.56.0`。

在任意 js 文件中，只要头部注释包含 `@flow` ， Flow 的服务便会对当前文件进行类型检查，并且在 Atom 的底部状态栏会更新 Flow 的覆盖率。如果有类型错误，Flow 会像 Eslint 那样有报错提示。

### Flow 在 Atom 上的配置

1. 在 Atom 上安装 [Nuclide](https://nuclide.io/) 开发工具， 打开 settings,  在 Install 中搜索并安装 `Nuclide`
2. 建议重启下 Atom

### Flow 在 WebStorm 上的配置

WebStorm 打开项目后，在 Preferences -> Languages & Frameworks -> JavaScript 上按下面截图配置：![flow-config-at-webstorm]({{ "/assets/flow-config-at-webstorm.png" | absolute_url }})


另外关于 Flow 在 React Native 项目上的一些细节实践将在另一篇文章介绍。

End.



