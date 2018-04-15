"use strict";
//document.write("<script src='https://google.github.io/traceur-compiler/bin/traceur.js'></script><script src='https://google.github.io/traceur-compiler/bin/BrowserSystem.js'></script><script src='https://google.github.io/traceur-compiler/src/bootstrap.js'></script>")

/* *
   * choice : 全选按钮
   * selected : 复选按钮
   * judeg() : 调用此方法，可点击全选按钮，全选复选按钮或取消复选按钮
   * submits() : 调用此方法，可获取所有已选的slected按钮的id
   * */
function checkSub(choice,selected) {
	if(choice == undefined || typeof choice != 'string') throw new Error('全选按钮选择凭证填写不正确');
	if(selected == undefined || typeof selected != 'string') throw new Error('复选按钮选择凭证未填');
	this._choice = choice;
	this._selected = selected;
}
checkSub.prototype = {
	judeg : function () {
		var _this = this;
		if($(_this._choice).is(':checked')){
			$(_this._selected).each(function () {
				$(_this._selected).prop("checked", true);
			});
		}else{
			$(_this._selected).each(function () {
				$(_this._selected).prop("checked", false);
			});
		}
	},
	submits : function () {
		var _this = this,
			arr = new Array();
		$(_this._selected).each(function () {
			if($(this).prop("checked") == true){
				arr.push(parseInt($(this).parent().next().text()));
			}
		})
		return arr;
	}
}
//checkSub.prototype = {
//	checkChoice : function (choice) {
//		if(choice == undefined || typeof choice != 'string'){
//			return false;
//		}
//	}
//}
//checkSub.prototype.judeg = function () {
//	var _this = this;
//	if($(_this.choice).is(':checked')){
//		$(_this.selected).each(function () {
//			$(_this.selected).prop("checked", true);
//		});
//	}else{
//		$(_this.selected).each(function () {
//			$(_this.selected).prop("checked", false);
//		});
//	}
//}
//checkSub.prototype.submits = function () {
//	var _this = this,
//		arr = new Array();
//	$(_this.selected).each(function () {
//		if($(this).prop("checked") == true){
//			arr.push(parseInt($(this).parent().next().text()));
//		}
//	})
//	return arr;
//}

/* * 
   * choice : 全选按钮
   * selected : 复选按钮
   * judeg() : 调用此方法，可点击全选按钮，全选复选按钮或取消复选按钮
   * submits() : 调用此方法，可获取所有已选的slected按钮的id
   * */














/*
 * 2018.03.22
 * 键盘事件
 * 公有方法，keyOverall，获取在body中的键盘值
 * 私有方法，_keyLogin，回车事件按下时执行
 * 
 * */
function events(id) {
	this.setId(id);
}
events.prototype = {
	setId : function (id) {
		if(id == undefined || typeof id != 'string') throw new Error('id填写错误');
		var ids = id.split("");
		var classs = id.split("");
		if(ids.indexOf('#') != 0 && classs.indexOf('.') != 0){
			throw new Error('id填写错误');
		}
		this.id = id;
	},
	_keyLogin : function () {
		var _this = this;
		if(event.keyCode == 13){
			$(_this.id).click();
		}
	},
	keyOverall : function () {
		var _this = this;
		$('body').keydown(function () {
			_this._keyLogin();
		})
	}
}
/*
 
 * 2018.03.22
 * 键盘事件
 * 公有方法，keyOverall，获取在body中的键盘值
 * 私有方法，_keyLogin，回车事件按下时执行
 * 
 * */









/*
 
 * times: 调用时要输入的秒数
 * elemId： 调用时输入一个id或者一个类，可以用于定义某个元素的标记
 * countDown()方法定义了一个倒计时的时钟，类型为00:00:00，调用可在elemId中输出
 * btnCode()方法定义了一个倒计时的秒，类型为数字，调用可在elemId中输出
 * 
 * */
function timeCounter (times, elemId) {
	this._setTimes(times);
	this._setElemId(elemId);
	this._setVar();
}
timeCounter.prototype = {
	_setTimes : function (times) {
//		if(times == undefined) throw new Error('时间不准为空');
		this._times = times;
	},
	_setElemId : function (elemId) {
//		if(elemId == undefined || typeof elemId != 'string' || elemId == "") throw new Error('点击按钮绑定dom错误');
		this.elemId = elemId;
	},
	_setVar : function () {
		/*
		 
		 * winning: 储存所有可中抽数字
		 * minNumber： 储存最小中奖数
		 * maxNumber： 储存最大中奖数
		 * luckyNum： 储存已中奖数
		 * */
		let winning,
		minNumber,
		maxNumber,
		luckyNum,
		lotteryNum,
		lotterying;
		this.winning = winning;
		this.minNumber = minNumber;
		this.maxNumber = maxNumber;
		this.luckyNum = luckyNum;
		this.lotteryNum;
		this.lotterying;
	},
	//timeCounter定义的一个内部私有方法，用于循环出00:00:00模式的时间
	_count : function () {
		var ints,
		_this = this;
		return function () {
			var s = (_this._times%60) < 10 ? ('0' + _this._times%60) : parseInt(_this._times%60);
			var h = (_this._times/3600) <10 ? ('0' + parseInt(_this._times/3600)) : parseInt(_this._times/3600);
			var m = (_this._times-h*3600)/60 < 10 ? ('0' + parseInt((_this._times-h*3600)/60)) : parseInt((_this._times-h*3600)/60);
			$(_this.elemId).text(h + ' : ' + m + ' : ' + s)|$(_this.elemId).val(h + ' : ' + m + ' : ' + s);
			_this._times--;
			ints = setTimeout(_this._count(), 1000);
			if(_this._times < 0) clearTimeout(ints);
		}
	},
	//timeCounter定义的一个内部私有方法，用于循环出倒数的秒
	_secondCal : function () {
		var times;
		var _this = this;
		return function () {
			$(_this.elemId).text(_this._times)|$(_this.elemId).val(_this._times+"秒后重新获取验证码");
			_this._times--;
			times = setTimeout(_this._secondCal(), 1000);
			if(_this._times < 0) {
				clearTimeout(times);
				$(_this.elemId).removeAttr('disabled');
				$(_this.elemId).val('点击获取验证码');
			}
		}
	},
	
	/*
	 * 可外部调用的方法，调用可获得一串随机数
	 * nums:获得的随机数需要多长,默认为6位
	 * */
	randomNun : function (nums) {
		if(nums <= 0) throw new Error('nums参数必须大于0');
		nums = nums || 6;
		var num="";
		for(var i=0; i<nums ; i++){
			num+=Math.floor(Math.random()*10);
		}
		({} = [num,'1']);
		return num;
	},
	//可外部调用的方法，调用可得一个00:00:00格式的时间
	countDown : function () {
		var _this = this;
		(_this._count())();
	},
	//外部可调用的方法，调用可得一个倒计时的秒数
	btnCode : function () {
		var _this = this;
		(_this._secondCal())();
	},
	//外部调用此方法，可得到一个随机的颜色
	getRandomColor : function () {
   		return '#' + (~~(Math.random() * (1 << 24))).toString(16);
	},
	//获取随机数字
	getLuckyNumber : function () {
		let _this = this;
		return _this.winning;
	},
	/*
	 
	 * 获取可中奖数字
	 * minNumber: 最小的可中奖数
	 * maxNumber： 最大的可中奖数
	 * */
	getWinningNumber : function (minNumber, maxNumber) {
		let _this = this;
		if(typeof minNumber != 'number'){ throw new Error(minNumber+'输入错误，请输入一个数字！') };
		if(typeof maxNumber != 'number'){ throw new Error(minNumber+'输入错误，请输入一个数字！') };
		if(minNumber > maxNumber){ throw new Error('幸运号小数不能大于大数') };
		_this.minNumber = minNumber;
		_this.maxNumber = maxNumber;
		_this.winning = [];
		for(let i=minNumber; i<=maxNumber;i++){
			_this.winning.push(i);
		}
		return _this.winning;
	},
	/*
	 
	 * 获取已中奖的幸运数字,在一个数组区间中随机去掉一些子元素,返回已抽中数字数组
	 * winningNumber: 可中奖数
	 * minNum： 最小可中奖数，如果为调用getWinningNumber方法，此为必填，如果调用，可选填
	 * maxNum： 最大可中奖数，如果为调用getWinningNumber方法，此为必填，如果调用，可选填
	 * */
	getRandomWinning : function (winningNunber,minNum,maxNum) {
		let _this = this;
		if(_this.minNumber == undefined || _this.maxNumber == undefined){
			if(typeof minNum != 'number' || typeof maxNum != 'number') throw new Error('幸运数输入错误，请输入一个数字！');
			_this.winning = [];
			for(let i=minNum; i<=maxNum;i++){
				_this.winning.push(i);
			}
		}
		if(winningNunber>_this.maxNumber-_this.minNumber+1){
			throw new Error('您选择抽奖数量大于幸运号剩余数');
		}
		if(winningNunber>_this.winning.length){
			throw new Error('您选择抽奖数量大于幸运号剩余数');
		}
		_this.luckyNum = [];
		_this.lotteryNum = _this.lotteryNum || [];
		_this.lotterying = _this.lotterying || [];
		for(let i=0;i<winningNunber&&(_this.maxNumber-_this.minNumber>0);i++){
			let index = ~~(Math.random() * (_this.maxNumber-_this.minNumber+1)+_this.minNumber);
			if(index > _this.winning[_this.winning.length]){
				index = _this.winning[_this.winning.length-1]
			}
			if(_this.winning.indexOf(index) != -1){
				let remove = _this.winning.indexOf(index);
				_this.luckyNum.push(index);
				_this.winning.splice(remove,1);
			}else{
				i--;
			}
		}
		for(let i=_this.lotteryNum.length;i>0;i--){
			if(_this.lotterying.indexOf(_this.lotteryNum[i-1]) != -1){
				_this.lotteryNum.splice(i-1,1);
			}
		}
		console.log(_this.lotterying);
		if(_this.lotteryNum.length > 0){
			if(_this.lotteryNum.length > winningNunber){
				let arr = [],
				arr2 = [],
				arr3=[],
				num = 0,
				sun = 0;
				//判断幸运数字中是否已经存在内定数字，如果存在，保存并从内定中删除
				for(let i=_this.lotteryNum.length;i>0;i--){
					_this.lotterying.push(_this.lotteryNum[i-1]);
					if(_this.luckyNum.indexOf(_this.lotteryNum[i-1]) != -1){
						arr.push(_this.lotteryNum[i-1])
						_this.lotteryNum.splice(i-1,1);
						sun++;
					}
				}
				//判断缺多少个内定则抽奖人数满，讲所有幸运数替换为内定数字
				for(let n=winningNunber-sun;n>0;n--){
					_this.luckyNum.push(_this.lotteryNum[n-1]);
					arr.push(_this.lotteryNum[n-1]);
					arr2.push(_this.lotteryNum[n-1]);
					_this.lotteryNum.splice(n-1,1);
				}
				//将幸运数中不未被随机抽中且在内定中不存在的数保存并删除
				for(let n=0;n<_this.luckyNum.length;n++){
					for(let j=0;j<arr.length;j++){
						if(arr.indexOf(_this.luckyNum[n]) == -1&&_this.lotteryNum.indexOf(_this.luckyNum[n]) == -1){
							arr3.push(_this.luckyNum[n]);
							_this.luckyNum.splice(n,1);
						}
					}
				}
				//在全部可抽数字中，增加被抽中退回的数
				for(let y=0;y<arr3.length;y++){
					_this.winning.push(arr3[y]);
				}
				//
				for(let z=arr2.length;z>0;z--){
					let remov = _this.winning.indexOf(arr2[z-1]);
					_this.winning.splice(remov,1);
				}
				_this.maopaosort(_this.winning);
			}else{
				let arr = [],
				arr2 = [],
				arr3=[];
				//判断幸运数字中是否已经存在内定数字，如果存在，保存并从内定中删除
				for(let i=_this.lotteryNum.length;i>0;i--){
					_this.lotterying.push(_this.lotteryNum[i-1]);
					if(_this.luckyNum.indexOf(_this.lotteryNum[i-1]) != -1){
						//保存一随机出的内定数字
						arr.push(_this.lotteryNum[i-1]);
						_this.lotteryNum.splice(i-1,1);
					}
				}
				//将所有内定数字全部丢入幸运数组中
				for(let y=0;y<_this.lotteryNum.length;y++){
					arr2.push(_this.lotteryNum[y]);
					_this.luckyNum.push(_this.lotteryNum[y]);
				}
				for(let z=0;z<_this.luckyNum.length;z++){
					if(_this.lotteryNum.indexOf(_this.luckyNum[z]) == -1&&arr.indexOf(_this.luckyNum[z]) == -1){
						if(_this.luckyNum.length > winningNunber){
							arr3.push(_this.luckyNum[z]);
							_this.luckyNum.splice(z,1);
							z--;
						}
					}
				}
				for(let z=arr2.length;z>0;z--){
					let remov = _this.winning.indexOf(arr2[z-1]);
					_this.winning.splice(remov,1);
				}
				for(let n=0;n<arr3.length;n++){
					_this.winning.push(arr3[n]);
				}
				_this.maopaosort(_this.winning);
				_this.lotteryNum = [];
			}
		}
		console.log('幸运数：'+_this.luckyNum);
		console.log('剩余数：'+_this.winning);
		return _this.luckyNum;
	},
	/*
	 
	 * 调用启用内定功能
	 * arr: 储存内定数字的数组
	 * */
	lotteryNumber : function (arr) {
		let _this = this;
		_this.lotteryNum = arr;
	},
	//冒泡排序，可将数组中的值按顺序排序
	maopaosort : function (arr) {
	    var len = arr.length;
	    for (var i = 0; i < len; i++) {
	        for (var j = 0; j < len - 1 - i; j++) {
	            if (arr[j] > arr[j+1]) {        //相邻元素两两对比
	                var temp = arr[j+1];        //元素交换
	                arr[j+1] = arr[j];
	                arr[j] = temp;
	            }
	        }
	    }
	    return arr;
	},
	//数组去重
	arrOutRepeat : function (arr) {
		let arr2 = [];
		arr2.push(arr[0]);
		for(let i=0;i<arr.length;i++){
			if(arr2.indexOf(arr[i]) == -1){
				arr2.push(arr[i]);
			}
		}
		return arr2;
	}
}
/*
 * times: 调用时要输入的秒数
 * elemId： 调用时输入一个id或者一个类，可以用于定义某个元素的标记
 * countDown()方法定义了一个倒计时的时钟，类型为00:00:00，调用可在elemId中输出
 * btnCode()方法定义了一个倒计时的秒，类型为数字，调用可在elemId中输出
 * 
 * */

























/*
 * banners 轮播图效果
 * 公有方法: centent, 定义此方法可定义一个轮播图
 * 公有方法: clickLeft,定义此方法可扩展轮播图，增加点击向左按钮
 * 公有方法： clickRight，定义此方法可扩展轮播图，增加点击向右按钮
 * 公有方法： clickDom，为clickleft与clickright的合集，传入两个参数，可点击左右变换
 * 公有方法： zidon,定义轮播图自动滚动
 * 私有方法： _zidonstop,定义轮播图暂停
 * 私有方法： _zidonstart,定义轮播图滚动
 * imgs: 一个class类或者id，用于定义图片的主题，为一组数据
 * navs： 一个class类或者id，用于定义轮播图的滚动节点，为一组与图片一样长度的数据,可选参数
 * navClass： 定义的是navs被选中时的样式,可选参数
 * i:定义储存当前图片索引，不可定义
 * timer：定义一个定时器，不可定义
 * fun：定义当前使用的轮播图模式，不可定义
 * */
function banners (imgs, navs, navsClass, i, timer, fun) {
	this._setimgs(imgs);
	this._setnavs(navs);
	this._setnavsClass(navsClass);
	this._i(i);
	this._timer(timer);
	this._fun = fun || 'jiandan';
};
banners.prototype = {
	_setimgs : function (imgs) {
		if(typeof imgs == undefined || typeof imgs != 'string' || imgs == ""){ throw new Error('第一个参数: '+ imgs +' 填写错误，请填写一个字符串类型的class或者id') };
		this.imgs = imgs;
	},
	_setnavs : function (navs) {
		this.navs = navs;
	},
	_setnavsClass : function (navsClass) {
		this.navsClass = navsClass;
	},
	_i : function (i) {
		if(i != undefined){ throw new Error(i+"为默认值，不可填写") };
		this._i = i;
	},
	_timer : function (timer) {
		if(timer != undefined){ throw new Error(timer+"为默认值，不可填写") };
		this._timer = timer;
	},
	_classBisic : function (x) {
		let _this = this;
		$(_this.imgs).css('display','none');
		$(_this.imgs).eq(x).css('display','block');
		$(_this.navs).removeClass(_this.navsClass);
		$(_this.navs).eq(x).addClass(_this.navsClass);
	},
	_clicks : function (x) {
		let _this = this,imgLength = $(_this.imgs).length;
		if(_this._fun == "jiandan"){
			_this._i = _this._i || 0;
			x?(--_this._i < 0?_this._i = imgLength-1:_this._i):(++_this._i > imgLength-1?_this._i = 0:_this._i);
			_this._classBisic(_this._i)
		}
	},
	_zidonstop : function () {
		let _this = this;
		clearInterval(_this._timer);
	},
	_zidonstart : function (nums) {
		let _this = this;
		_this._timer = setInterval(function () { _this.clickRight(); },nums);
	},
	//fun固定参数,暂时有：jiandan
	//jiandan：定义此参数可开启最简单的轮播图
	centent : function (fun) {
		let _this = this,
		imgLength = $(_this.imgs).length;
		_this._fun = fun;
		if(fun == "jiandan"){
			$(_this.imgs).css('display','none');
			$(_this.imgs).eq(0).css('display','block');
			$(_this.navs).eq(0).addClass(_this.navsClass);
			for(let i=0; i<imgLength; i++){
				$(_this.navs).eq(i).click(function () {
					_this._classBisic(i);
					_this._i = i;
				});
			};
		}
	},
	clickLeft : function () {
		let _this = this;
		_this._clicks(true);
	},
	clickRight : function () {
		let _this = this;
		_this._clicks(false);
	},
	//lefts为点击向左的DOM节点，right为点击向右的DOM节点
	clickDom : function (lefts, rights) {
		if(lefts == undefined || typeof lefts != 'string' || lefts == ""){ throw new Error('第一个参数: '+ lefts +' 填写错误，请填写一个字符串类型的class或者id') };
		if(rights == undefined || typeof rights != 'string' || rights == ""){ throw new Error('第二个参数: '+ rights +' 填写错误，请填写一个字符串类型的class或者id') };
		let _this = this;
		if(_this._fun == "jiandan"){
			let clicks = function (x) { _this._clicks(x) };
			$(lefts).click(function () { clicks(true) });
			$(rights).click(function () { clicks(false) });
		}
	},
	//hover： 当启动自动轮播时，定义可以使移入这个区间暂停，移出继续启动
	//num为轮播图滚动毫秒数,默认为2秒滚动一次
	zidon : function (hover, nums) {
		if(hover == undefined || typeof hover != 'string' || hover == ""){ throw new Error('参数: '+ hover +' 错误') };
		nums = nums || 2000;
		if(typeof nums != 'number'){ throw new Error('参数: '+ nums +'应该为number格式') };
		let _this = this,
		imgLength = $(_this.imgs).length;
		if(_this._fun == "jiandan"){
			_this._timer = setInterval(function () {
				_this.clickRight();
			},nums)
			$(hover).mouseover(function () {
				_this._zidonstop();
			})
			$(hover).mouseout(function () {
				_this._zidonstart(nums);
			})
		}
	}
}






/*
 
 * 字符串类型的定义
 * */
function XinString () {
	this._setVar();
}
XinString.prototype = {
	_setVar : function () {
		
	},
	//将字符串转成unicode编码的方式
	encodeUnicode : function (str) {
		let res = [];
		for(let i=0;i<str.length;i++){
			res[i] = ( "00" + str.charCodeAt(i).toString(16)).slice(-4);
		}
		return "\\u" + res.join("\\u");
	},
	//对unicode编码的字符串进行解码
	decodeUnicode : function (str) {
		str = str.replace(/\\/g,"%");
		return unescape(str);
	}
}
