# with-context

## 这个包是干嘛的

`React v16.3.0` 版本提供了官方正式版本的 [context API](https://reactjs.org/blog/2018/03/29/react-v-16-3.html)，看到这个消息我是非常期待的，仿佛看到摆脱了Redux的自己在夕阳下奔跑的样子，但还没等我高兴几下，但是官网的demo就给我破了一盆凉水。

官方的demo是这么写的：

```javascript
const ThemeContext = React.createContext('light');

class ThemeProvider extends React.Component {
  state = {theme: 'light'};

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

class ThemedButton extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => <Button theme={theme} />}
      </ThemeContext.Consumer>
    );
  }
}
```
？？？好像有什么不对劲，这个 `Consumer` 好像只能应用在 `render()` 里面啊，没有放在 `props` 里的数据我怎么拿他来替代 `Redux` 😭。

经过了短暂的失落后，我突然想起了一个东西，没错，就是 `react-router` 里面的 `withRouter`:
```javascript
export withRouter(Home)
```

这个API能够将路由的相关数据映射到组件 `props` 上，然后在组件内就能为所欲为了，那么，我自己写一个 `withContext` 把当前组件用到的 Context 数据扔到props上不久好了嘛，所以我写了这个包。

## 如何使用

首先是标准步骤，安装：
```bash
npm i as-with-context -S
```

然后，这样：
```javascript
//context.js
const ThemeContext = React.createContext('light')

export const ThemeProviderr = ThemeContext.Provider
export const ThemeConsumer = ThemeContext.Consumer

// 组件内
import React, { Component } from 'react'
import { ThemeConsumer } from './context'
import withContext from '~context/withContext'

class Home extends Component {
  ...
}

export default withContext(Home, ThemeConsumer, 'myTheme')
```

这样，ThemeContext 中的相关数据就可以通过 `this.props.myTheme` 来访问啦

## 使用多个Context

当然，我们在一个组件内不可能只使用一个全局状态，所以使用 Context API 就(经常)会出现同时使用多个 Context 的情况。

先看以下[官方的demo](https://reactjs.org/docs/context.html#consuming-multiple-contexts)

```javascript
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```

enmmmm，看着就好麻烦的样子，这个不能忍啊。

所以针对这种情况，我们还有另外一个API来处理多个 context 的情况

```javascript
import { ThemeConsumer, InfoConsumer } from './context'
import { withContexts } from '~context/withContext'

class Home extends Component {
  ...
}

const Contexts = [
  { name: 'myTheme', consumer: ThemeConsumer },
  { name: 'myInfo', consumer: InfoConsumer }
]

export default withContexts(Home, Contexts)
```

铛铛铛铛铛，这样是不是看着就清爽多啦。然后依然是从 props 中直接取数据就可以了

## 文档

withContext(component, consumer[, name])
> name 为空的话，会是用默认值 'consumer' 来标记

withContexts(component, ContextsList)
> Contexts 中的元素，name 相同时，后一项会覆盖前一项，请不要作死

## 写在最后

这个项目是我从最近的项目中总结出来的办法，存在着许多不足，欢迎交流，我们issue见～
