## 新机开发环境设置  
### 安装依赖  
1. [VS Code](https://code.visualstudio.com/)
2. [Node.JS](https://nodejs.org)
3. [Yarn](https://yarnpkg.com)
### 安装全局常用包  
```bash
# 避免被墙，使用以下config设置
yarn config set registry http://registry.npm.taobao.org
yarn config set sass_binary_site http://npm.taobao.org/mirrors/node-sass/
yarn config set phantomjs_cdnurl http://npm.taobao.org/mirrors/phantomjs
yarn config set CHROMEDRIVER_CDNURL http://npm.taobao.org/mirrors/chromedriver
yarn config set electron_mirror http://npm.taobao.org/mirrors/electron/
yarn config set fsevents_binary_host_mirror http://npm.taobao.org/mirrors/fsevents/

# 如需通过代理访问网络，请设置对应的proxy
# yarn config set proxy http://#.#.#.#:****
# yarn config set https-proxy http://#.#.#.#:****

# 全局安装前端相关工具
yarn global add node-sass webpack webpack-cli gulp-cli gulp typescript @angular/cli @vue/cli
```
