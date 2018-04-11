# 订单中心

## 项目简介
   基于 React 的前端开发环境，用于前后端分离后的单页应用开发，可以在开发时使用 ES2015 最新语言特性。项目包含：

   - 基础库: React、react-router、react-redux、redux-saga
   - 组件库: antd
   - 编译/打包工具：webpack、babel、
   - 单元测试工具：暂无
   - 本地服务器：nginx

## 目录结构

    ├── README.md                       项目介绍
    ├── .gitignore                      不需要git版本控制的文件
    ├── dist                        用于发布的资源目录，构建生成
    ├── createNginx.js                  服务启动入口
    ├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
    ├── index.html                      入口页面
    ├── .babelrc                        babel配置文件
    ├── .eslintrc                       eslint配置文件
    ├── .eslintignore                   eslint配置不检查的文件
    ├── webpack.config.js               wabpack开发环境配置
    ├── webpack.production.config.js    wabpack生产环境配置
    ├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
    └── src                             前端文件资源目录
        ├── components                     所有页面目录
        │   │   │   ├──customer-service    页面添加逻辑目录
        │   │   │   │    ├── view.jsx      本页面入口
        │   │   │   │    ├── MyModal.jsx   本页面组成部分
        │   │   │   │    ├── me.json       元文件
        │   │   │   │    ├── reducers.js   reducer文件
        │   │   │   │    ├── action.js     action文件
        │   │   │   │    ├── saga.js       saga文件
        │   │   │   │    ├── style.css     本页面的样式文件
        │   │   │   │    └── types.js      本页面的所有action所需的type字段
        │   │   │   ├── failedaddrorde     页面添加逻辑目录
        │   │   │   │   └──  ...        同customer-service
        │   │   │   ├── check              页面编辑逻辑目录
        │   │   │   │     └──  ...      同customer-service
        │   ├── index.js                    封装组件内部redux和reducer文件
        │   └── route.jsx
        生成路由路径文件
        ├── middleWares                     中间件目录
        ├── lib                             工具函数目录
        ├── server.js                       接口处理文件
        ├── entry.jsx                       模块化入口文件
        ├── langs                           语言包


## 环境安装

本项目依赖 node.js、nginx， 使用前先安装 node.js 和 cnpm（淘宝的镜像库，显著提升依赖包的下载速度）

1、自行下载并安装 node.js： https://nodejs.org/en/download/

2、然后安装 cnpm 命令：

    npm install -g cnpm --registry=https://registry.npm.taobao.org

## 快速开始

    git clone git@50.23.190.55:nj_shein_fed/order-center.git

    cd order-center

    npm install

    npm run start

    npm run build

    npm run dev

## 命令列表
    # 开启本地服务 地址：localhost:8000
        npm run start

    # 构建代码，自动生成在 ./dist 文件中
        npm run build

## 前后端分离
  项目基于 spa 方式实现前后端分离，后端只提供接口，返回JSON数据都由前端进行处理展示，前端本地服务用于封装后端接口，以更好的服务于前端界面

## 模块化
 开发时使用 ES2015 module 语法，构建时每个文件会编译成 amd 模块。

## 组件规范
 项目使用antd组件库，但是每个组件目录都应遵守就近原则规范，规范目录如下

    components
          ├── customer-service
          │    ├── view.jsx                       本页面入口
          │    ├── reducer.js                     reducer文件
          │    ├── action.js                      action文件
          │    ├── saga.js                        saga文件
          │    ├── me.json                        元文件
          │    ├── style.css                      本页面的样式文件
          │    ├── types.js                       本页面的所有action所需的type字段
          │    └── xxx.jsx                        本页面组成部分，按需增加
          ├── add                             页面添加逻辑目录
          │   └──  ...                            同customer-service
          ├── check                            页面编辑逻辑目录
          │     └──  ...                           同customer-service

## 联调方式
前后端分离后，由于服务端和前端的开发环境处于2台不同的机器上，前端的异步请求需要代理到后端机器中。 联调的时候，打包发布版本到测试环境

## 测试环境的链接
http://test.oms.cn/index_new.php
## 域名解析
192.168.1.177  test.oms.cn
## 相关资源

- react 官网：http://reactjs.cn/react/index.html
- react-router 文档：https://react-guide.github.io/react-router-cn/
- react-intl GitHub: https://github.com/yahoo/react-intl
- antd 文档：https://ant.design/index-cn
- webpack 文档：https://webpack.github.io/docs/
- gulp 文档：http://gulpjs.com/
- ES2015 入门教程：http://es6.ruanyifeng.com/
- koa 官网：http://koajs.com/
