===

标题: 从零开始的react之路(1)--JSX
标签: 前端,react
分类: 从零开始的react之路
简介: 这是个关于react的一系列入门笔记

===

## 一、什么是JSX

```js
const element = <h1>Hello,world!</h1>
```
类似这种语法，既有点像JS的表达式，又像HTML表达的结构便是JSX。

JSX是一个JavaScript的语法扩展，其本质目的是为了使用xml的方式来表达组件的嵌套，从而与HTML保持一致的结构。

JSX通过Babel编译后，就能得到相应的JS结构。

## 二、JSX的基本特性
### 1、使用表达式

#### 嵌入表达式

```js
const name = 'Kwok'
const element = <h1>Hello, {name}</h1>

ReactDom.render(
	element,
	document.getElementById('root')
)
```
上面这个例子中，我们定义了一个`name`的变量，然后在JSX中用包含在大括号内，这就是在JSX中的嵌入表达式。

我们可以在大括号内放置任何有效的JavaScript的表达式。例如：`2 + 2`、`user.name`、`formatName(user)`等都是有效的JavaScript表达式。在下面例子，我们将把`formatName(user)`嵌入到JSX中。

```js
function formatName(user) {
	return user.firstName + ' ' + user.lastName
}

const user = {
	firstName: 'Kwok',
	lastName: 'Vaileung'
}

const element = (
	<h1>
		Hello, {formatName(user}!
	</h1>
)

ReactDOM.render(
	element,
	document.getElementById('root')
)
```

#### 自身也是一种表达式
通过编译后，JSX表达式会变转化为JS表达式，所以，在JSX中我们可以使用`if`语句和`for`循环语句。

```js
function getGreeting(user) {
	if (user) {
		return <h1>Hello, {fiormatName(user)}!</h1>
	}
	return <h1>Hello, Stranger.</h1>
}
```

### 2、指定属性

JSX可以使用引号来定义以字符串为值的属性：

```js
const element = <div tabIndex="0"></div>;
```

也可以使用大括号来定义以JavaScript表达式为值的属性：

```js
const element = <img src={user.avatarUrl} />;
```

因为JSX的特性更接近JavaScript而不是HTML，所以React DOM使用camelCase（小驼峰）命名来定义属性的名称，而不是使用HTML的属性名称。例如：class变成了className，而tabindex则对应着tableIndex。

### 3、闭合格式
#### 自闭合
假如标签内没有其他内容，则可以像XMl语法一样用`/>`来闭合标签。

```js
const element = <img src={user.avatarUrl}/>
```

#### 标签闭合
JSX标签允许嵌套多个子标签

```js
const element = (
	<div>
		<h1>Hello!</div>
		<h2>Nice to meet you!</h2>
	</div>
)
```

### 4、防止注入攻击
React DOM在渲染之前默认会过滤所有传入的值。它可以确保应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止XSS（跨站脚本攻击）。

所以在JSX中嵌入用户输入是安全的。

```js
const title = response.potentiallyMaliciousInput;
const element = <h1>{title}</h1>;
```

### 5、JSX表示为对象
```js
const element = (
	<h1 className="greeting">
		Hello, world!
	</h1>
)
```

上面这段代码跟下面那段代码是等效的，因为Babel会把JSX编译成一个名为`React.createElement()`的函数调用。

```js
const element = React.createElement(
	'h1',
	{className: 'greeting'},
	'Hello, world!'
)
```

`React.createElement`创建了一个对象,这种对象被称为"React 元素",它可以描述我们的HTML结构的信息，包括标签名、属性、子元素等，当获得这些HTML结构的信息后，React就能帮我们构建DOM元素然后展示到我们所看到的页面。

以下便是`React.createElement`所构建的一个对象：

```js
cosnt element = {
	type: 'h1',
	props: {
		className: 'greeting',
		children: 'Hello, world!'
	}
}
```

