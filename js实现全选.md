---
title: js实现全选
tags: 全选,复选
---

利用jq实现js的全选
首先引入jq
```
<script src="js/jquery.js"></script>
```

然后写js代码
```
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
```

写完js，我们开始写html代码，先暂时不写css：
```

```
然后对刚刚写的js进行调用
```

```
这样一个多选就完成了，然后再对另一个方法进行调用，就能获取到表单里面的数据了，如果需要改变获取的数据，就修改向arr数组里面push的数据就可以了