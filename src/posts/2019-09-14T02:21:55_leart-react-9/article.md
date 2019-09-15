===

标题: 从零开始的react之路(9)--状态提升
标签: 前端,react
分类: 从零开始的react之路
简介: 这是个关于react的一系列入门笔记

===

# 状态提升

```js
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

// 转换函数，转换成摄氏度
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

// 转换函数，转换成华氏度
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

// 转换函数，输出转换值
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

// 判断温度组件
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

// 输入组件
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

// 计算组件
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
```

`toCelsius`和`toFahrenheit`为两个转换函数，可以在摄氏度和华氏度之间相互转换，而`tryConvert`为转换函数输出最后的转换值。

在`Calculator`组件里，使用了两个`TemperatureInput`输入组件，每个输入组件里内部的state是各自不同的数据，如果我们要让两个输入框内的数值保持同步，我们可以把共享的state向上移动到最近的公共父组件中，即`Calculator`组件。各子组件的state提升到父组件之后，在父组件里进行处理，然后通过props传回各子组件里。

