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
	//drawCanvas初始显示
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