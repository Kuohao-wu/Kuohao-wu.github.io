---
title: react初体验
tags: react
categories: react
---

心血来潮，想体验一下react是怎么样的，所以自己跑去做了一个todolist的应用，发现react并没有像vue那样简洁优雅，要实现的东西往往比vue要来得更复杂，所以，我还是了解一下就好了。

### 组件生命周期
先贴一张生命周期示意图
![react cyclelife][1]

react生命周期分三个mounting，updating，unmounting

生命周期hook函数
1. getDefaultProps 继承父组件的props
2. getInitalState  初始化组件state
3. componentWillMount 组件将要被挂载
4. componentDidMount  组件已经被挂载
5. componentWillReceiveProps 组件将要接收props参数
6. shouldComponentUpdate 组件是否需要更新，返回值为true or false，默认为true，但是可以自己再里面进行一些逻辑判断，决定组件是否更新
7. componentWillUpdate 组件将要被更新
8. componentDidUpdate 组件完成更新



### react模块

react模块使用es6模块的方式，相比vue-cli，会更加像JavaScript。

>  创建一个react组件 TitleComponent.jsx

```javascript
    import React from 'react'
    // 创建一个组件类，并继承React.Component类
    class TitleComponent extends React.Component {
        constructor(props){
            // 使用super继承父类属性和方法
            super(props)
        }
        // render函数返回要渲染的html
        render(){
            return (
                // 因为es6用了class，所以react中要改成className
                <div className="title">
                    // 使用props访问父组件传过来的数据
                    // 解析数据使用{}
                    // 如果在jsx中插入对象会被react警告
                    // 只能插入基本类型的数据
                    <h4>{this.props.title}</h4>
                </div>
            )
        }
    }
```


### 组件的使用之父组件向子组件传递数据

> 创建一个app.jsx

```javascript
    import React from 'react'
    import TitleComponent form 'TitleComponent.jsx'
    
    class App extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                title: 'hello react'
            }
        }
        render() {
            <TitleComponent title={this.store.title}/>
        }
    }
    // 组件引入需要使用单标签的形式，而且组件首字母需要大写
```

从上面可以看出
1. app.jsx中创建了一个APP的父类，子类在父类的render中被组合，
通过属性传参，而子组件则通过继承，得到了App父类的数据访问权限，子组件可以通过
this.props访问父组件的属性和方法


### 组件的使用之子组件向父组件传递数据
子组件是不能直接修改父组件传递过来的数据的，在vue中可以使用eventEmit来传递事件和数据，而react可以使用父组件的回调函数，通过props来传递参数。如果子组件改变了状态，那么需要通知父组件修改数据，才能更新视图,这也是vue和react的共同之处

// 如，我下面有一个需求，在5秒之后改变标题名

```javascript
    import React from 'react'
    class TitleComponent extends React.Component {
        constructor(props){
           super(props)
        }
        changeHandle() {
            setTime(()=>{
                // this.props.title = 'hello world' 直接修改会被警告
                // 正确姿势应该是 —— 这样
                this.props.changeTheTitle('hello world')
            },5000)
        }
        render(){
            return (
                <div className="title">
                    <h4>{this.props.title}</h4>
                    <button onClick={this.changeHandle}>change the title</button>
                </div>
            )
        }
    }
```

在app.jsx上给这个组件加上回调方法

```javascript
    import React from 'react'
    import TitleComponent form 'TitleComponent.jsx'
    
    class App extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                title: 'hello react'
            }
        }
        changeTheTitle(text) {
            // 这样也是不能更新数据的
            // this.props.title = text
            // 要使用setState才能
            this.setState({
                title: text
            })
            // setSate方法，react会判断新旧数据的变化来决定是否重绘子组件
        }
        render() {
            <TitleComponent changeTheTitle={this.changeTheTitle} title={this.store.title}/>
        }
    }
    
    React.render(<App />, document.getElementById('app'))
```

老子可以修改儿子的数据，但是儿子永远不能动老子的数据，以下犯上。除非用了redux，为什么它能，因为它是皇帝啊！天下都是它的，谁还动不得


  [1]: http://static.zybuluo.com/kuo-hao/f2lsv21n8c47b28bysd1srpw/react%20lifeCycle1.png
