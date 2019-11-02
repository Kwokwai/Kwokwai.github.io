===

标题: 从零开始的react之路(10)--组合&&继承
标签: 前端,react
分类: 从零开始的react之路
简介: 本系列根据官方文档来进行学习，通过这段学习，初步了解react的一些重要机制

===

# 1、包含关系

子组件：

```js

function FancyBorder(props) {
	return (
		<div className={'FancyBorder FancyBorder-' + props.color}>
			{props.children}
		</div>
	)
}	


```

父组件：

```js
fuction WelcomeDialog() {
	return (
		<FancyBorder color="blue">
			<h1 className="Dialog-title>
			Welcome
			</h1>
			<p className="Dialog-message">
			Thank you for visiting our spacecraft!
			</p>
		</FancyBorder>
	)
}
```
从上面两段代码片段可以看到，很多时候会出现组件包含的关系，而组件之间的传值问题我们可以通过props来解决。

# 2、继承关系

如果你想要在组件间复用非 UI 的功能，我们建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们。
