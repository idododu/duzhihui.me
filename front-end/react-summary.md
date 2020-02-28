<script src="https://unpkg.com/mermaid@8.4.8/dist/mermaid.min.js"></script>

## React的核心理念  
1. f(state) = view  
2. 一切皆组件  
3. 组合优于继承  
   
### 组合优于继承  
#### why
- 继承是静态的，运行时无法动态改变继承了父类的子类行为
- 继承使得子类的逻辑与父类逻辑紧密耦合在一起
- 继承只能继承一个父类，组合可以根据需要任意增加组合

```es6
// 使用继承来实现
class Developer {
    constructor(public name) {}
    work() {}
}

class FrontEnd extends Developer {
    createUI() {}
}

class BackEnd extends Developer {
    createAPI() {}
}

class FullStack extendes Developer {
    // 只可以单继承，导致必须拷贝FrontEnd和BackEnd中的代码
    createUI() {}
    createAPI() {}
}

function App() {
    return (
        {isFrontEnd && <FrontEnd>}
        {isBackEnd && <BackEnd>}
        {isFullStack && <FullStack>}
    )
}
```

```es6
// 使用组合来实现
class Developer {
    constructor(public name, public work: Function) {}
}
function createUI() {}
function createAPI() {}
function fullStack() {
    // 复用，而非拷贝
    createUI()
    createAPI()
}

function App() {
    return (
        // 动态分配
        <Developer work={isFullStack ? fullStack : createUI}>
    )
}
```


## 组件的类型  
### 容器组件(Container Component) vs 展示组件(Presentational Component)  
- 容器组件负责处理应用的数据以及业务逻辑，同时将状态数据与操作函数作为属性传递给子组件  
- 展示组件负责根据父组件传递的属性显示信息以及响应用户交互，它一般是无状态的  
- 容器组件也叫状态组件(Stateful Component)， 展示组件也叫无状态组件(Stateless Component)  
- 容器组件也叫Smart Component， 展示组件也叫Dumb component  

```es6
// 容器组件
import React from 'react';
import axios from 'axios';
import { UserList } from '../views/user-list';

class UserListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    componentDidMount() {
        axios.get('/path/to/user-api').then(response => {
            this.setState({users: response.data})
        });
    },

    render() {
        return (
            <UserList users={this.state.users} />
        );
    }
};
```

```es6
// 展示组件
function UserList(props) {
  render: function() {
    return (
      <ul className="user-list">
        {props.users.map((user) => {
            return (
            <li key={user.id}>
                <Link to="{'/users/' + user.id}">{user.name}</Link>
            </li>
            );
        })}
      </ul>
    );
  }
};
```

### 受控组件(Controlled Component) vs 非受控组件(Uncontrolled Component)  
- 受控组件是指react组件中通过state来控制表单输入元素的值  
- 非受控组件是指通过DOM元素来换取表单元素的值  
- 非受控组件更容易继承React和非React代码  

```es6
// 受控组件
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <form>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}

// 非受控组件
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  render() {
    return (
      <form>
        <label>
          名字:
          <input type="text" ref={this.input} />
        </label>
      </form>
    );
  }
}
```

### 高阶组件(Higher Order Component)
- 核心理念： enhancedComponent = hocFactory(wrappedComponent)
- 使用高阶组件可以实现以下效果
  - 代码复用(DRY)
  - 属性代理(Props Proxy)
  - 反向继承(Inheritance Inversion)
  - 渲染劫持(Render Hijacking)

```es6
// 属性代理：hoc中可以对WrappedComponent的属性进行增删查改操作
function propsProxyHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      const newProps = {
        user: currentLoggedInUser
      }
      // 修改WrappedComponent的属性
      return <WrappedComponent {...this.props} {...newProps}/>
    }
  }
}
```

```es6
// 反向继承：hoc返回的组件继承了WrappedComponent, 并通过super关键字访问WrappedComponent中的属性及方法
// 渲染劫持：hoc控制了WrappedComponent的渲染输出，可以修改render输出或是有条件的渲染元素
// 通过反向继承可以实渲染劫持
function inheritanceInversionHOC(WrappedComponent) {
  return class II extends WrappedComponent {
    render() {
        if(this.props.loggedIn) {
            return super.render();
        } else {
            return null
        }
    }
  };
}
```


## 组件更新机制
<div class="mermaid">  
stateDiagram
    step1 : Pending setState stack
    step2 : shouldComponentUpdate
    step3 : Compute next state
    step4 : update DOM

    [*] --> step1
	step1 --> step2
    step2 --> step3
    step3 --> VirtualDOM
    state VirtualDOM {
      step1 : render next element
      step2 : diff
      [*] --> step1
      step1 --> step2
      step2 --> [*]
    }
    VirtualDOM --> step4
    step4 --> [*]
</div>

## 组件通信  

### 父子组件通信  
<div class="mermaid">
graph TD;
    Parent-->Child;
</div>

```es6
// Parent与Child进行通信可通过状态提升
class Parent extends React.Component {
    value = 0
    name = 'username'
    updateValue() {}
    render() {
        return (
            <>
                <A name={this.name} updateValue={this.updateValue} />
            </>
        )
    }
}
```

### 兄弟组件通信  
<div class="mermaid">
graph TD;
    Parent-->A;
    Parent-->B;
</div>

```es6
// A与B进行通信可通过状态提升
class Parent extends React.Component {
    value = 0
    updateValue() {}
    render() {
        return (
            <>
                <A updateValue={this.updateValue} />
                <B value={this.value} />
            </>
        )
    }
}
```


### 嵌套组件通信  
<div class="mermaid">
graph TD;
    Parent-->A;
    Parent-->B;
    A-->A1;
    B-->B1;
</div>

```es6
// Parent与A1或B1进行通信：
// 1. 层层组件传递props
class Parent extends React.Component {
    value = 0
    name = 'username'
    updateValue() {}
    render() {
        return (
            <>
                <A name={this.name} updateValue={this.updateValue} />
            </>
        )
    }
}

class A extends React.Component {
    render() {
        return (
            <A1 name={this.props.name} updateValue={this.props.updateValue} />
        )
    }
}

// 2. 使用context
const NameContext = React.createContext('username');

class Parent extends React.Component {
    render() {
        return (
            <NameContext.Provider value="username">
                <A />
            </>
        )
    }
}

class A extends React.Component {
    render() {
        return (
            <A1 />
        )
    }
}

class A1 extends React.Component {
    static contextType = NameContext;
    render() {
        return <Button name={this.context} />;
    }
}

```


### 非嵌套组件通信  
<div class="mermaid">
graph TD;
    A-->A1;
    B-->B1;
</div>

- EventEmitter发布订阅通信  
- 使用状态管理进行通信  

## 状态管理  

### Flux
- 特性：单向数据流
- 缺陷： 要频繁绑定事件；无异步action方案
![Flux](https://user-images.githubusercontent.com/18378034/34917580-58d83204-f983-11e7-804f-4b88caaf1e28.jpg)

### Redux
- 特性：单向数据流、支持时间回溯、中间件拓展
- 三大原则，store 唯一，state 只读， reducer 纯函数  
![Redux](https://user-images.githubusercontent.com/18378034/34917582-5c04bb28-f983-11e7-8fba-aa0f9b3b65dc.jpg)

### MobX
- 特性： 响应式编程
![MobX](https://user-images.githubusercontent.com/18378034/34917669-86bd3f24-f984-11e7-9e4a-d4815726752b.png)


## 表单集成  
### 关注内容
- 表单数据更新
- 表单事件处理
- 数据有效性校验
- 非react插件集成

### 解决方案  
- Formik
- Redux Form

## 性能优化 

### 资源加载性能优化
- Code Splitting + Lazt Loading
- Uglify, gzip, CDN, HTTP2

### 组件性能优化
- 类组件通过实现`shouldComponentUpdate`接口逻辑
- 使用`React.PureComponent`进行优化，因为`React.PureComponent`实现了`shouldComponentUpdate`接口，会对`prop`和`state`进行浅层对比
- 函数式组件通过`React.memo`来记忆组件渲染结果，如果props未发生变化，React将跳过渲染，直接复用最近一次渲染结果
- 函数式组件使用`useMemo`来缓存安规的计算耗时
- 使用不可变数据结构`immutable-js`来轻松追踪对象数据变化
- 事件节流防抖
- 使用 Web Workers 处理 CPU 密集任务
- SSR