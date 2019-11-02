===

标题: 从零开始的react之路(5)--事件处理
标签: 前端,react
分类: 从零开始的react之路
简介: 本系列根据官方文档来进行学习，通过这段学习，初步了解react的一些重要机制


===

# 1、React事件处理方式

React事件绑定属性的命名采用驼峰式写法。

如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM 元素的写法)

```js
function handle() {
	console.log(666)
}
//HTML常规写法
<button onclick="handle()">点击</button>

//React写法
<button onClick={handle}>点击</button>
```
在React中，如果需要阻止默认行为，必须使用`preventDefault`，不能直接通过返回`false`的方式来阻止。

```js
//HTML常规写法
<a href="#" onclick="console.log(666); return fallse">点我</a>

//React写法
function ActionLink() {
	function handlerClick(e) {
		e.preventDefault()
		console.log(666)
	}
	
	return (
		<a href="#" onClick={handleClick}>点我</a>
	)
}
```

# 2、绑定事件this问题
class继承的组件当中，默认不会绑定`this`。

```js
class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggleOn: true
		}
	}
	
	handleClick() {
		this.setState({
			isToggleOn: !this.state.isToggleOn
		})
	}
	
	render() {
		return (
			<button onClick={this.handleClick}>
				{this.state.isToggleOn ? 'ON' : 'OFF}
			</button>
		)
	}
}
```

以上代码片段会报出`Uncaught TypeError: Cannot read property 'setState' of undefined`的错误，因为this的指向并不是这个组件。

有四种方法可以绑定事件处理函数的this到当前组件：

1）使用bind方法进行原地绑定

```js
render() {
		return (
			<button onClick={this.handleClick.bind(this)}>
				{this.state.isToggleOn ? 'ON' : 'OFF}
			</button>
		)
	}
```

缺点是每次执行`bind`都会生成新的函数，会造成额外的开销。

2）使用箭头函数

```js
render() {
		return (
			<button onClick={e = > this.handleClick(e)}>
				{this.state.isToggleOn ? 'ON' : 'OFF}
			</button>
		)
	}
```

3）在constructor提前对事件进行绑定

```js
constructor(props) {
	super(props);
	this.state = {
		isToggleOn: true
	}
	this.handleClick = this.handleClick.bind(this)
}
```

缺点是每个事件都需要在这里进行绑定。

4）使用箭头函数来事件

```js
handleClick = (e) => {
	this.setState({
		isToggleOn: !this.state.isToggleOn
	})
}
```

# 3、向事件处理函数传递参数

传递参数给处理事件函数有两种方式：

1）使用箭头函数

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
```

通过箭头函数传递参数，事件的对象必须显式传递。

2）使用bind绑定

```js
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

通过bind方式传递，事件对象及参数将被隐式传递。
