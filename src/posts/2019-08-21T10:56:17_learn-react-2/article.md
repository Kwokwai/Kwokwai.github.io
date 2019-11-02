===

标题: 从零开始的react之路(2)--虚拟DOM&元素渲染
标签: 前端,react
分类: 从零开始的react之路
简介: 本系列根据官方文档来进行学习，通过这段学习，初步了解react的一些重要机制


===

## 1、虚拟DOM
JSX会被转移成`React.createElement`的方法
而这个方法所构成的对象，便是虚拟DOM。

```js
const element = {
	type: 'h1',
	props: {
		className: 'greeting',
		children: 'Hello,world!'
	}
}
```

## 2、元素渲染为DOM
```js
const element = <h1>Hello, world</h1>
ReactDOM.render(
	element,
	document.getElementById('root')
)
```

上面这段代码便是将React元素渲染为DOM的过程，其中起重要作用的是`ReactDOM.render()`。

以下这段代码则是上面那段代码转化后所展示的出来的，因此`render`所接收的第一个参数是createElement返回的对象，也就是虚拟DOM，第二个参数是挂载目标。由此可见，`ReactDOM.render()`的作用是将虚拟DOM转化为真实DOM。

```js
ReactDOM.render(
	React.createElement('h1', null,'Hello,world!')
	document.getElementById('root')
)
```

## 3、更新渲染过的元素
React元素是不可变对象，即元素一旦被创建，其元素或者属性是固定的，无法进行更改，而我们所看到的页面或UI则是由许多这样的元素所组成，那么当我们要更新页面或者UI时，唯一的办法就是重新创建一个新的元素，然后再由`ReactDOM.render()`渲染出来。

```js
functiontick() {
	const elemetn = (
		<div>
			<h1>Hello, world!</h1>
			<h2>It is {new Date().toLocaleTimeString()}
			</h2>
		</div>
	)
	ReactDOM.render(
		element,
		document.getElementById('root')
	)
}

setInterval(tick, 1000)
```

上面这段代码是一个计时器的例子，在`setInterval()`里回调，每秒调用一次`ReactDOM.render()`。
