---
title: uiRouter二级路由
tags: angular,uiRouter,路由
grammar_cjkRuby: true
---


# 准备工作
## 先引入uiRouter
angular如果想要使用uiRouter模块，就要先引用这个文件，这个g'ithub里面有得下载，然后先在入口文件先引入angular文件，然后再引入uiRouter文件

```
<script type="text/javascript" src="js/angular.min.js" ></script>
<script type="text/javascript" src="js/angular-ui-router.js" ></script>
```


## 定义angular的ng-app和ng-controller

先在html部分定义app，定义angular的生效范围，然后在body标签定义定义controller。因为引入了uiRouter，所以定义路由的跳转是用ui-sref的，先定义好一级路由的跳转，再把视图定义好
```
<!DOCTYPE HTML>
<html ng-app="app">
	<head>
		<title>uiRouter二级路由</title>
		<!--<base href="/home" />-->
		<script type="text/javascript" src="js/angular.min.js" ></script>
		<script type="text/javascript" src="js/angular-ui-router.js" ></script>
	</head>
	<body ng-controller="mycler">
		<a ui-sref = "/home">home</a>
		<div ui-view=""></div>
	</body>
</html>
```
刚刚定义好了html的部分，现在开始写js，先定义好一个模型，并注入ui.router，定义好刚刚我们定义的控制器mycler。

定义完成后，我们开始定义我们的一级路由的视图，home，利用config可以定义路由，如下config里面的代码。$urlRouterProvider是定义如果在发生路由跳转的时候，找不到路由的地址，可以跳转的路由，$stateProvider就是定义路由了，templateUrl就是定义路径了，写好我们要写写好这个home界面，然后像这样就可以使用一级路由了

```
			var app = angular.module("app",["ui.router"]);
			app
			.controller("mycler", ($scope) => {
				
			})
			.controller("home",($scope,$state) => {
				$state.go("home.demo");
			})
			.controller("demo",($scope) => {
				
			})
			.controller("demo2",($scope) => {
				
			})
			app.config(($stateProvider, $urlRouterProvider) => {
				$urlRouterProvider.otherwise("/home");
				$stateProvider
				.state("home",{
					name : "home",
					url : "/home",
					templateUrl : "sabPage/home.html",
					controller : "home"
				})
					.state("home.demo",{
						name : "demo",
						url : "/demo",
						templateUrl : "sabPage/home/demo.html",
						controller : "demo"
					})
					.state("home.demo2",{
						name : "demo2",
						url : "/demo2",
						templateUrl : "sabPage/home/demo2.html",
						controller : "demo2"
					})
			})
```
二级路由是用“.”来连接的，然后其他的部分和一级路由一样定义就可以了，不过不同的地方就是一级路由在定义按钮跳转的时候，只需要用ui-sref="home"就可以了，而二级路由需要ui-sref=".demo"，要注意前面是有点的，而且路由的视图要放在以定义的一级路由下面