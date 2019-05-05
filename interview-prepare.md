## 软件工程
### 数据结构
- 列表
- 栈（先进后出）
- 队列（先进先出）
- 链表
- 字典
- 哈希表
- 树（二叉树、红黑树、平衡二叉树）
- 图（有向图）
### 常见算法
#### 排序算法
- 冒泡排序
- 选择排序
- 插入排序
- 合并排序
- 快速排序
- 堆排序
#### 查询算法
- 树-深度优先
- 树-广度优先
- 二分查找
### 简述常用设计模式
- 工厂
- 单例
- 适配器
- 代理
- 策略模式
- 观察者模式
- 状态模式

### [面向对象六大原则（SOLID）](https://github.com/knightsj/object-oriented-design)
- SRP   Single Responsibility Principle 单一职责原则：  
一个类（函数、方法）只允许有一个职责，即只有一个导致该类变更的原因。  
优点： 如果类与方法的职责划分得很清晰，不但可以提高代码的可读性，更实际性地更降低了程序出错的风险，因为清晰的代码会让bug无处藏身，也有利于bug的追踪，也就是降低了程序的维护成本。
- OCP   Open Close Principle    开闭原则: 一个软件实体如类、模块和函数应该对扩展开放，对修改关闭。(接口、继承)  
优点： 实践开闭原则的优点在于可以在不改动原有代码的前提下给程序扩展功能。增加了程序的可扩展性，同时也降低了程序的维护成本。
- LSP   Liskov Substitution Principle   里氏替换原则   
所有引用基类的地方必须能透明地使用其子类的对象，也就是说子类对象可以替换其父类对象，而程序执行效果不变。  
优点： 可以检验继承使用的正确性，约束继承在使用上的泛滥。
- LoD   Law of Demeter （ Least Knowledge Principle） 迪米特法则（最少知道原则）  
迪米特法则也叫做最少知道原则（Least Know Principle）， 一个类应该只和它的成员变量，方法的输入，返回参数中的类作交流，而不应该引入其他的类（间接交流）。  
优点： 实践迪米特法则可以良好地降低类与类之间的耦合，减少类与类之间的关联程度，让类与类之间的协作更加直接。
- ISP   Interface Segregation Principle 接口分离原则  
不建立庞大臃肿的接口，应尽量细化接口，接口中的方法应该尽量少。  
优点： 避免同一个接口里面包含不同类职责的方法，接口责任划分更加明确，符合高内聚低耦合的思想。  
- DIP   Dependency Inversion Principle  依赖倒置原则  
依赖抽象，而不是依赖实现。高层模块不能依赖低层模块，二者都应该依赖抽象。  
优点： 通过抽象来搭建框架，建立类和类的关联，以减少类间的耦合性。而且以抽象搭建的系统要比以具体实现搭建的系统更加稳定，扩展性更高，同时也便于维护。

### 浏览器输入url后发生了什么
1. DNS域名解析：（浏览器自身DNS -> 操作系统DNS -> 本机hosts文件 -> 域名服务器）
2. 建立TCP连接： 三次握手
3. 发送HTTP请求: Request Header(url, method, cookie, content-type), Form Data/request payload, 
4. 接收响应结果： Response Header, Response body
5. 浏览器解析HTML：构建DOM树， 下载CSS/JS资源文件，构建CSS树，构建渲染树
6. 浏览器布局渲染：根据渲染树布局，计算每个节点的集合信息（视图中的大小和位置）， 在屏幕上绘制各个节点（颜色、背景\文本...）

### HTTP协议
- 网络五层模型： 物理层 -> 数据链路层 -> 网络层 -> 传输层(TCP/UDP) -> 应用层(HTTP/FTP)
HTTP2.0采用多路复用技术，做到同一个连接并发处理多个请求，资源效率加载提升很多
- 状态： 200, 304, 401, 404, 500

### 
## HTML
## CSS
### 什么是重绘和重排
- 重绘Repaint: 元素外观的改变，浏览器进行重新绘制
- 重排Reflow: 元素尺寸布局发生了变化，需要重新计算渲染树

### 如何减少repaint和reflow
- 不要一条条的修改DOM样式
- 把DOM离线后修改
- 为动画的HTML组件使用fixed或absolute的布局设置，脱离文档流

## JavaScript
### 原型链继承
每个对象拥有一个原型对象，通过 proto (读音: dunder proto) 指针指向其原型对象，并从中继承方法和属性，同时原型对象也可能拥有原型，这样一层一层，最终指向 null(Object.proptotype.__proto__ 指向的是null)。这种关系被称为原型链 (prototype chain)，通过原型链一个对象可以拥有定义在其他对象中的属性和方法。
```javascript
function SuperType() {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function() {
    console.log(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function() {
    console.log(this.age);
};
```
### 闭包
闭包的定义： 访问了外部变量的函数，就是闭包；
闭包的最大用处有两个：
1. 封装私有变量（保护函数内的变量安全）；实现JS的模块；
2. 读取函数内部的变量
3. 让这些变量的值始终保持在内存中。
```javascript
function f1() {
    var a = 1;

    function f2() {
        return a;
    }
    return f2;
}
var result = f1();
result();
```
闭包的坏处：内存消耗大
### 模块化
### Event Loop
执行栈立即执行；异步代码
同步代码推入执行栈/主线程（execution stack），异步代码推入任务队列(task queue)并注册回调函数;
主线程先执行；执行完毕后调用任务队列；异步任务完成后触发回调函数，返回主线程运行；

node.js平台可以用很少的资源，应付大流量访问，也是因为这种异步模式使得主线程可以运行更多的任务

### 新特性
## TypeScript
### Typescript优势
Javascript超集，静态类型，在开发阶段即可保证代码的可靠性；更容易进行代码重构；配套工具提升开发效率；
## ES6
### ES6有哪些新特性
1. 新的语法糖： 箭头函数、类、字符串模板、结构、参数默认值
2. 模块化：原生支持module
3. 监听器Proxy： 监听对象内部发生什么变化
4. promise: 异步处理
5. async/await: 是promise和generator的语法糖；async表示函数是异步的，调用后返回promise对象，使用then方法加回调函数

## 其他
### Web前端性能优化
|优化方向|优化手段|
|--------|--------|
|请求数量   |合并脚本和样式表，CSS Sprites，拆分初始化负载，划分主域|
|请求带宽   |开启 GZip，精简 JavaScript，移除重复脚本，图像优化|
|缓存利用   |使用 CDN，使用外部 JavaScript 和 CSS，添加 Expires 头，减少 DNS 查找，配置 ETag，使 AjaX 可缓存, dns-prefetch/prefetch/subresource/rerender|
|页面结构   |将样式表放在顶部，将脚本放在底部，尽早刷新文档的输出|
|代码校验   |避免 CSS 表达式，避免重定向|
|服务器优化 |HTTP 2|

CDN(Content Delivery Network),哟农户就近获取内容，降低网络堵塞，提高用户访问响应速度和命中率

### Web安全
- sql注入
- 缓冲区溢出： 通过缓冲区溢出获取程序、系统的控制权
- 嗅探： 窃听网络数据包
- XSS：跨站脚本攻击（Cross-Site Scripting）； 需要对用户输入数据进行转义
- CSRF：跨站请求伪造(Cross-Site reqest forgery)；禁止跨域请求、验证码、token
- 网络劫持；https加密
- 控制台注入代码
- iframe风险；增加sandbox属性
### webpack插件
### Angular底层原理
1. 双向绑定如何实现
------------------------------------------
Vue数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的.
观察者(Observer)： 使用Object.defineProperty, ES6 Proxy来监听属性变化;
监听器(Watcher/Listener)： 观察者发现对象属性发生变化时，调用对应的监听器；监听器一般用来处理html元素属性的修改
编译器(Compile): 编译模板文本，注册监听器
------------------------------------------
脏值检测： AngularJs扩展了浏览器的事件循环(Event Loop)，生成了一个angular context的执行环境；用户操作触发事件时，angular从上自下调用$digest流程，更新数据变量
------------------------------------------
虚拟DOM树：数据更新时调用setState方法，由框架通过虚拟dom树来判断最小渲染路径，为DOM节点打补丁

2. 依赖注入如何实现
通过依赖注入来实现控制反转，进行代码解耦，有效避免同时修改调用者和实现者；
申明者(Declare): 定义、申明依赖注入
注入器(Injector): 实例化服务对象，并缓存在依赖注入注册表中；
触发器(Invoker): 分析函数所依赖的对象，通过注入器获取对应的对象实例，传给对应函数并执行

3. 模板引擎如何实现
模板 -> 解析 -> 抽象语法树ast -> 渲染
4. 单项数据流原理
view -> actions -> state -> view; 通常使用在状态管理中
5. 事件机制
6. 状态管理
vuex, redux: 解决多个组件共享状态