===

标题: 从零开始的react之路(7)--列表&Key
标签: 前端,react

===

# 1、渲染多个组件
```js
const numbers = [1, 2, 3, 4, 5]
const listItems = numbers.map((number) => 
	<li>{number}</li>
)

ReactDOM.render(
	<ul>{listItems}</ul>,
	document.getElementById('root')
)
```

在React里，可以使用`map()`方法来遍历数组，然后将数组里的每个元素变成`<li>`等标签，最后渲染到DOM里。

# 2、key
在React里，key可以识别哪些元素改变了，所以数组里每个元素应该赋予一个确定的标识，最好是元素在列表里拥有一个独一无二的字符串，通常是取数据id作为元素的key。

```js
const todoItems = todos.map((todo) => 
	<li key={todo.id}>
		{todo.text}
	</li>
)

const todoItems = todos.map((todo, index) => 
	<li key={index}>
		{todo.text}
	</li>
)
```

# 3、基础列表组件
```js
function NumberList(props) {
	const numbers = props.numbers
	const listItems = numbers.map((number) => 
		<li key={number.toString()}>
			{number}
		</li>
	)
	return (
		<ul>{listItems}</ul>
	)
	
	const numbers = [1, 2, 3, 4, 5]
	ReactDOM.render(
		<NumberList numbers={numbers} />,
		document.getElementById('root')
	)
}
```
在上面这段代码里，我们创建一个元素时，必须包括一个特殊的`key`属性。

# 4、用key提取组件

元素的key只有放在就近的数组上下文中才有意义。

```js
// 错误的使用key
function ListItem(props) {
	const value = props.value
	return (
		<li key={value.toString()}>
			{value}
		</li>
	)
}

function NumberList(porps) {
	const numbers = props.numbers
	const listItems = numbers.map((number) => 
		<ListItem value={number} />
	)
	
	return (
		<ul>
			{listItems}
		</ul>
	)
}

const numbers = [1, 2, 3, 4, 5]
ReactDOM.render(
	<NumberList numbers={numbers} />,
	document.getElementById('root')
)

// 正确的使用key方式
function ListItem(props) {
	return <li>{porps.value}</li>
}

function NumberList(props) {
	const numbers = props.numbers
	const listItems = numbers.map((number) => 
		<ListItem key={number.toString() value={number}}
	)
	
	return (
		<ul>
			{listItems}
		</ul>
	)
}

const numbers = [1, 2, 3, 4, 5]
ReactDOM.render(
	<NumberList numbers={numbers} /},
	document.getElementById('root')
)
```

# 5、在JSX中嵌入map()
```js
function NUmberList(props) {
	const numbers = props.numbers
	const listItems = numbers.map((number) => 
		<Listitem key={number.toString()} value={number} />
	)
	
	return (
		<ul>
			{listItems}
		</ul>
	)
}
```

我们可以对以上代码稍作修改，在JSX里嵌入`map()`。

```js
function NumberList(props) {
	const numbers = props.numbers
	
	return (
		<ul>
			{numbers.map((number) =>
				<ListItem key={number.toString()} value={number} />
			)}
		</ul>
	)
}
```