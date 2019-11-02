===

标题: 从零开始的react之路(3)--组件
标签: 前端,react
分类: 从零开始的react之路
简介: 本系列根据官方文档来进行学习，通过这段学习，初步了解react的一些重要机制


===

## 1、组件的定义

根据官方文档"组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思",组件可以接受任意的入参(即"props"),并返回React元素,我们所看到的UI便是由组件所声明。

## 2、构建组件
### (1)类组件
```js
class Welcome extends React.Component {
	render() {
		return <h1>Hello,{this.props.name}</h1>
	}
}
```
以上代码片段为一个类组件例子。类组件拥有不同的生命周期,我们能够在不同的阶段(挂载、更新、卸载等)进行组件的控制，类组件能够维护自身的状态变量(state)。

### (2)函数组件
```js
function Welcome(props) {
	return <h1>Hello, {props.name}</h1>
}
```

以上代码片段为一个函数组件例子。函数所构建成的组件是`无状态`组件,能够接收`props`和`context`两个参数,不能接收`state`,所以生命周期中只有`render()`,然后返回一个React元素。

### (3)React.createClass()
利用`createClass()`API来创建组件。

```js
//组件首字母必须要大写
var Greeting = React.createClass({
	render() {
		return <h1>Hello,{this.props.name}</h1>
	}
})
```

## 3、渲染组件

React元素可以是DOM标签,也可以是自定义的组件,当React元素为自定义组件时,JSX所接收到的属性会转化成单个对象然后传给组件,这个对象叫作"props"。

```js
function Welcome(props) {
	return <h1>Hello, {props.name}</h1>
}

const element = <Welcome name="kwok" />

ReactDOM.render(
	element,
	document.getElementById('root')
)
```
可以看到上面这段代码,首先调用了`ReactDOM.render()`函数,然后传入了`<Welcome name="kwok" />`作为参数，接着React调用了自定义的`Weclome`组件,把`{name: 'kwok'}`作为props传入函数,`Welcome`组件把`<h1>Hello,kwok`</h1>作为返回值,最后ReactDOM把DOM更新为`<h1>Hello,kwok</h1>`。

## 4、组合组件
```js
function Welcome(props) {
	return <h1>Hello,{props.name}</h1>
}

function App() {
	return (
		<div>
			<Welcome name="kwok" />
			<Welcome mame="vai" />
			<Welcome name="leung" />
		</div>
	)
}
```

上面这段代码里,`App`组件里多次渲染了`Welcome`组件,这是因为组件可以在其输出中引入其他组件。

## 5、提取组件

```js
function Comment(props) {
	return (
		<div className="comment">
			<div className="UserInfo">
				<img className="Avatar" src={props.author.avatarUrl} alt={props.author.name} />
				<div className="UserInfoName>
					{props.author.name}
				</div>
			</div>
			<div className="CommentText">
				{props.text}
			</div>
			<div className="CommentDate">
				{formatDate(props.date)}
			</div>
		</div>
	)
}
```

可以看到,以上代码的`props`对象为

```js
props = {
	author: {
		avatarUrl: "",
		name: ""
	},
	text: "",
	date: ""
}
```

`Comment`这个组件里嵌套了多层关系,大大提高以后维护的难度,所以我们可以在`Comment`里提取组件,达到复用效果。

```js
function Avatar(props){
	return (
		<img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
	)
}

function UserInfo(props) {
	return (
		<div className="UserInfo">
			<Avatar user={props.user} />
			<div className="UserInfoName">
				{props.user.name}
			</div>
		</div>
	)
}
```

上面代码片段中,把`Avatar`和`UserInfo`提取出来,单独作为组件,以达到代码复用的效果。然后我们可以把`Comment`组件重新写过：

```js
function Comment(props) {
	return (
		<div className="Comment">
			<UserInfo user={props.author} />
			<div className="CommentText">
				{props.text}
			</div>
			<div className=CommentDate">
				{formatDate(props.date)}
			</div>
		</div>
	)
}
```

