---
mermaid: true
---

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
  - 渲染劫持(Render Hijacking)
  - 属性代理(Props Proxy)
  - 反向继承(Inheritance Inversion)

## Virtual DOM原理  
## 组件通信  
### 父子组件通信  
### 兄弟组件通信  
### 嵌套组件通信  
### 非嵌套组件通信  
<div class="mermaid">
graph TD;
    A-->A1;
    B-->B1;
    A1-->B1;
    B1-->A1;
</div>
1. EventEmitter发布订阅通信
2. 使用状态管理进行通信

## 状态管理  
## 表单集成  
## 性能优化  
