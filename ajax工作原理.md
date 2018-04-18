---
title: ajax工作原理
tags: ajax
grammar_cjkRuby: true
---

# ajax工作原理
<!-- more -->

## 关于同步和异步

	异步传输就是面向字符的传输，它的单位是字符。
	而同步传输就是面向比特的传输，他的单位是数据帧，在传输的时候，要求发送方与接收的时钟是一致的。
	异步传输是将比特分成小组来传输的，一个小组一般有8个字符，一个字符占8个比特位，每个小组的开头都有一个起始位和一个结束位，异步传输不要求发送方和接收方的时钟一样，不过这样有个坏处，就是发送方无法知道接收方是否已经接收到数据，而接受方也无法知道发送方是否已经发送了数据。因此，异步传输要求有一个起始位开头，可以通知接收方传输开始了，这样就给了接收方接受，响应还有缓存比特数据的时间，当传输结束后，会有一个结束位表示此次传输的终止
	
	同步传输的比特组要比异步传输的分组大，它不是单独的发送每一个字符，而是把他们组合起来一起发送，我们可以称之为数据帧。
	同步传输的传输速度通常比异步传输的速度快。接收方不必每个字符都开始和结束接收，一旦检测到帧的同步字符，那么接下来就是在数据到达时接收他们。
	
## ajax所用到的技术
	1. 使用css和XHTML来表示
	2. 使用dom模型来交互和动态显示
	3. 使用XMLHttpRequest来和服务器进行异步通信
	4. 使用javascript来绑定和调用
	
## ajax原理和XMLHttpRequest对象

**ajax的原理就是通过XMLHttpRequest对象来向服务器端发送异步请求，从服务器端获取数据，然后用javascript来操作dom进而更新页面。**

	XMLHttpRequest是ajax的核心机制，他可以使得javascript即时的向服务器提出请求和处理响应，而不阻塞用户，从而达到无刷新的效果
	XMLHttpRequest的属性：
	

|   属性  |  描述   |
| --- | --- |
|  onreadystatechange   |  每次状态改变时所触发的时间处理程序   |
|  responseText   |  从服务器进程返回数据的字符串形式   |
|  responseXML   |  从服务器进程返回的DOM兼容的文档对象数据   |
|   status  |  从服务器返回的数字代码，比如常见的404和200   |
|  status Text   |  伴随着状态码的字符串信息   |
|  readystate    |  对象的状态值：0为对象已经建立，但未初始化，1为对象已经建立，尚未调用send方法，2为send方法以调用，但是状态码和http头未知，3为已接受部分数据，因为响应及http头不全，这时通过responseText和responseXML获取部分数据会出错，4为数据接收完毕，此时可以通过responseText和responseXML接受数据  |

	由于浏览器差异，所以我们要对XMLHttpRepuest进行浏览器兼容
```
function createXmlHttp(){
	var xmlHttp;
	if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest(); 
	}
	if(window.ActiveXobject){
		try {
			xmlHttp = new ActiveXobject("Microsoft.XMLHTTP");
		}
		catch (ex) {
			throw new Error(ex);
		}
	}
}



```



