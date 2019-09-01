===

标题: 从零开始的react之路(6)--条件渲染
标签: 前端,react

===

# 1、元素变量
当我们需要有条件地渲染组件的一部分时，我们可以使用变量来储存元素。

```js
class LoginControl extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this)
		this.handleLogoutClick = this.handleLogoutClick.bind(this)
		this.state = {isLoggedIn: false}
	}
	
	handleLoginCLick() {
		this.setState({isLoggedIn: true})
	}
	
	handleLogoutClick() {
		this.setState({isLoggedIn: false})
	}
	
	render() {
		const isLoggedIn = this.state.isLoggedIn;
		let button;
		
		if (isLoggedIn) {
			button = <LogoutButton onClick={this.handleLogoutClick} />
		} else {
			button = <LoginButton onClick={this.handleLoginClick} />
		}
		
		return {
			<div>
				<Greetin isLoggedIn={isLoggedIn} />
			</div>
		}
	}
	
}

ReactDOM.render(
	<LoginControl />,
	document.getElementById('root')
)
```

以上代码片段中，`LoginControl`是一个有状态的组件，它会根据`isLoggedIn`的值不同从而决定渲染`<LoginButtom />`还是`<LogoutButton />`。

# 2、与运算符&&

我们可以直接在JSX中嵌入与（&&）运算表达式。

```js
function MailBox(props) {
	const unreadMessages = props.unreadMessage;
	
	return (
		<div>
			<h1>Hello!</h1>
			{unreadeMessages.length > 0 && <h2>
				You have {unreadMessages.length} unread messages.
			</h2>
			}
		</div>
	)
}

const messages = ['React', 'Re: React', 'Re:Re:React]
ReactDOM.render(
	<MailBox unreadMessages={messages} />,
	document.getElementById('root')
)
```
在JS中，`true && expression`会返回`expression`，`false && expression`会返回`false`。所以，如果是`true`，React会渲染`&&`右侧的元素，如果是`false`，React会直接忽略它。

# 3、三目运算符

`condition ? true : false`，这是三目运算符的表达式，当`condition`为`true`时，则执行`:`左边的表达式，反之执行`:`右边的表达式。

```js
render() {
	const isLoggedIn = this.state.isLoggedIn;
	return(
		<div>
			The user is <b>{isLoggedIn ? 'currently' : 'not}</b> logged in.
		</div>
	)
}
```

# 4、阻止组件渲染
```js
function WarningBanner(porps) {
	if (!props.warn) {
		return null
	}
	
	return (
		<div className="warning">Warning!</div>
	)
}

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showWarning: true}
		this.handleToggleClick = this.handleToggleClick.bind(this)
	}
	
	handleToggleClick() {
		this.setState(state => ({
			showWarning: !state.showWarning
		}))
	}
	
	render() {
		return (
			<div>
				<WarningBanner war={this.state.showWarning} />
				<button onClick={this.handleToggleClick}>
					{this.state.showWarning ? 'Hide' : 'Show'}
				</button>
			</div>
		)
	}
}

ReactDOM.render(
	<Page />,
	document.getElementById('root)
)
```

上面代码中，`<WarningBanner />`会根据prop中warn的值来进行条件渲染，如果warn的值是`false`，则组件不会被渲染。