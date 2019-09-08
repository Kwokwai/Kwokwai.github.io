===

标题: 从零开始的react之路(8)--表单
标签: 前端,react

===

# 1、受控组件

HTML中，`<input>`、`<textarea>`、`<select>`等表单元素通常会自己维护state，根据用户的输入不通值进行更新。

React中，可变状态一般保存在组件的state属性中，只能通过使用`setState()`来更新值。


因此，我们使用React来控制表单的取值，这种组件被称为受控组件。

以下例子就是一个受控组件：

```js
class NameForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {value: ''}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	handleChange(event) {
		this.setState({value: event.target.value})
	}
	
	handleSubmit(event) {
		alert('提交多名字：' + this.state.value)
		event.preventDefault()
	}
	
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					名字:
					<input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="提交" />
			</form>
		)
	}
}
```

# 2、textarea标签
在React中，`<textarea>`可以使用`value`属性，因此`<textarea>`和使用`<input>`相似。

```js
class EssayForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: '	请撰写一篇关于你喜欢的DOM元素的文章。'
		}
		
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = thgis.handleSubmit.bind(this)
	}
	
	handleChange(event) {
		this.setState({value: event.targee.value})
	}
	
	handleSubmit(event) {
		alert('提交的文章:' + this.state.value)
		event.preventDefault()
	}
	
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					<textarea value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="提交"/>
			</form>
		)
	}
}
```

# 3、select标签

如下一个例子，是HTML中用`<select>`创建的一个下拉列表标签：

```js
<select>
	<option value="grapefruit">葡萄柚</option>
	<option value="lime">酸橙</option>
	<option selected value="coconut">椰子</option>
	<option value="mango">芒果</option>
</select>
```
在React中，并不会使用`selected`属性，而是使用`value`属性：

```js
class FlavorForm extends React.Compoent {
	constructor(props) {
		super(props)
		this.state = {value: 'coconut'}
		
		this.handleChange = this.handleChange.bind(this)
		
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	handleChange(event) {
		this.setState({value: event.target.value})
	}
	
	handleSubmit(event) {
		alert('你喜欢的风味是：' + this.state.value)
		event.preventDefault()
	}
	
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					选择你喜欢的风味：
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="grapefruit">葡萄柚</option>
						<option value="lime">酸橙</option>
						<option value="coconut">椰子</option>
						<option value="mango">芒果</option>
					</select>
				</label>
				<input type="submit" value="提交" />
			</form>
		)
	}
}
```

# 4、处理多个输入

如果我们需要处理多个`input`元素时，我们可以给每个元素添加`name`属性，然后根据`event.targe.name`的值选择要执行的操作。

```js
class Reservation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isGoing: true.
			numberOfGuests: 2
		}
		
		this.handleInputChange = this.handleInputChange.bind(this)
	}
	
	handleInputChange(event) {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name
		
		this.setState({
			[name]: value
		})
	}
	
	render() {
		return (
			<form>
				<label>
					参与：
					<input
						name="isGoing"
						type="checkbox"
						checked={this.state.isGoing}
						onChange={this.handleInputChange} 
						/>
				</label>
				<br />
				<label>
					来宾人数：
					<input 
						name="numberOfGuests"
						type="number"
						value={this.state.numberOfGuests}
						onChange={this.handleInputChange}
					/>
				</label>
			</form>
		)
	}
}
```
