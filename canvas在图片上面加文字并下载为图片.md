---
title: canvas在图片上面加文字并下载为图片 
tags: canvas,图片,下载
---

#### 先定义canvas
```
<canvas id="myCanvas" width="960" height="403" style="border:1px solid #d3d3d3;">
	您的浏览器不支持 HTML5 canvas 标签。
</canvas>
<input type="button" id="btn" value="下载" />
<input type="button" value="提交" id="btn2" />
```

#### 然后定义js
首先定义一个构造函数，然后在这个构造函数的prototype上面写方法
```
function canvasFill() {
	this._setVar();
}
canvasFill.prototype = {
	_setVar : function () {
		let imgUrl,
		imgWidth,
		imgHeight,
		canvas,
		ctx;
		this.imgUrl = imgUrl;
		this.imgWidth = imgWidth;
		this.imgHeight = imgHeight;
		this.canvas = canvas;
		this.ctx = ctx;
	},
	/*
	 
	 * download方法，调用可下载图片
	 * type: 下载的图片的格式，例如jpg，png
	 * */
	downLoad : function (type) {
		let _this = this;
		//设置保存图片的类型
	    var imgdata = _this.canvas.toDataURL(type);
	    //将mime-type改为image/octet-stream,强制让浏览器下载
	    var fixtype = function (type) {
	        type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
	        var r = type.match(/png|jpeg|bmp|gif/)[0];
	        return 'image/' + r;
	    }
	    imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
	    //将图片保存到本地
	    var saveFile = function (data, filename) {
	        var link = document.createElement('a');
	        link.href = data;
	        link.download = filename;
	        var event = document.createEvent('MouseEvents');
	        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	        link.dispatchEvent(event);
	    }
	    var filename = new Date().toLocaleDateString() + '.' + type;
	    saveFile(imgdata, filename);
	},
	//newCanvas初始显示
	//canvasId： 输入一个canvas画布的id，必填参数
	//imgUrl： 输入一个需要显示的图片地址，必填参数
	//imgWidth： 图片在canvas里面显示的宽度,可选参数，如果不填则铺满canvas
	//imgHeight： 图片在canvas里面显示的高度,可选参数，如果不填则铺满canvas
	newCanvas : function (canvasId,imgUrl,imgWidth,imgHeight) {
		if(canvasId == undefined){ throw new Error('canvasId不能为空') };
		if(imgUrl == undefined){ throw new Error('imgUrl不能为空') };
		let _this = this;
		imgWidth = imgWidth || document.getElementById(canvasId).width;
		imgHeight = imgHeight || document.getElementById(canvasId).height;
		_this.canvas=document.getElementById(canvasId);
		_this.ctx=_this.canvas.getContext("2d");
		_this.imgWidth = imgWidth;
		_this.imgHeight = imgHeight;
		var img = new Image;
		img.src = imgUrl;
		
		_this.imgUrl = img;
		img.onload = function() {
			_this.ctx.drawImage(img,0,0,imgWidth,imgHeight);
		}
	},
	/*
	 
	 * btnId: 点击获取数据的按钮
	 * value: 打印在页面上的参数，可选，如不填则不打印
	 * imgUrl： 图片地址，可选，如果不填，显示初始图片
	 * imgWidth: 图片在canvas里面显示的宽度，可选参数，不填则继承初始设置的值
	 * imgHeight： 图片在canvas里面显示的高度，可选参数，不填则继承初始设置的值
	 * */
	drawCanvas : function (btnId,value,imgUrl,imgWidth,imgHeight) {
		let _this = this;
		if(imgUrl == undefined){
			imgUrl =_this.imgUrl;
		}else{
			var img = new Image;
			img.src = imgUrl;
			imgUrl = img;
		}
		value = value || [];
		imgUrl = img || _this.imgUrl;
		imgWidth = imgWidth || _this.imgWidth;
		imgHeight = imgHeight || _this.imgHeight;
		document.getElementById(btnId).onclick = function () {
			_this.ctx.drawImage(imgUrl,0,0,imgWidth,imgHeight);
			for(let i=0;i<value.length;i++){
				_this.ctx.fillText(value[i].name,value[i].X,value[i].Y);
			}
		}
	}
}
```
主要定义了三个方法：
第一个是newCanvas,这个方法定义了一个canvas的初始状态，就是在平铺一张图在canvas画布里面
第二个是drawCanvas，这个方法是点击按钮，将自己需要的数据打印到画布上面
第三个方法是download，这个方法是将现在的canvas保存成图片，并下载
具体的参数设置，上面都有注释
js定义好了以后，现在来调用：
##### 首先来定义一个模拟后端传过来的数据
```
let arr = [
	{name:"一一一",X:100,Y:100},
	{name:"二二",X:200,Y:200},
	{name:"三三三",X:300,Y:300}
]
```

然后现在正式开始调用:
```
//首先实例化
var c = new canvasFill();
//然后调用newCanvas方法，myCanvas这个画布
c.newCanvas('myCanvas','img/13091552.png');
//接下来是给一个按钮加事件，将刚刚模拟的数据丢进去，现在点击这个按钮的时候，数据就会按照规定打印到canvas里面了
c.drawCanvas('btn2',arr);
//最后是下载，这里没有写进到定义的函数里面，直接就这么写了，在点击按钮的时候，调用download方法，就完成了下载图片的任务了
document.getElementById('btn').onclick = function () {
	c.downLoad('png');
}
```