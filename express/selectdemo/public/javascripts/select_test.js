// function Ajax(method,url,data,success,failed){
// 	var xhr = null;
// 	if (window.ActiveObject) {
// 		xhr = new ActiveObject("Microsoft.XMLHTTP");
// 	} else if (window.XMLHttpRequest) {
// 		xhr = new XMLHttpRequest();
// 	} else {
// 		return null;
// 	}

// 	if (method == 'get') {
// 		if (data) {
// 			url += '?';
// 			url += data;
// 		}
// 		xhr.open('get',url,true);
// 		xhr.send();
// 	}

// 	if (method == 'post') {
// 		xhr.open('post',url,true);
// 		if (data) {
// 			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 			xhr.send(data);
// 		}
// 	}

// 	xhr.onreadystatechange = function() {
// 		if (xhr.readyState == 4 && xhr.status == 200) {
// 			console.log(xhr.responseText);
// 			var data = JSON.parse(xhr.responseText);
// 			success(data);
// 		} else {
// 			if (failed) {
// 				console.log(xhr.status);
// 			}
// 		}
// 	}
// }
//['ajax']这个是ajax.js文件名，后面ajax参数就是用来存储依赖的模块的
require(['ajax'],function(ajax) {
	var businessLineIdText = getSelectId("businessLineIdText");
	var ticketTypeText = getSelectId("ticketTypeText");
	//这里之前用name,造成了下面设置nameItem的时候的命名冲突，因未访问name.options的时候，name先访问的是nameItem里面的name属性
	var seName = getSelectId("name");
	var myData = null; //这个全局变量用来存储处理后的数据

	//调用模块ajax所返回的Ajax方法
	ajax.Ajax('get','http://127.0.0.1:8888/',null,function (data){
		console.log(data);
		myData = prepareData(data);
		//数据改变之后做出的处理
		notifyDataChange(myData);

	},function(error){
		console.log(error);
	});

	function prepareData(data) {
		var dataMap = {};
		for (var i = 0; i < data.length; i++) {
			var businessLine = data[i].businessLineIdText;
			// console.log(businessLine);
			var ticketType = data[i].ticketTypeText;
			if (!dataMap[businessLine]) {
				dataMap[businessLine] = {};
			}

			if (!dataMap[businessLine][ticketType]) {
				dataMap[businessLine][ticketType] = [];
			}

			dataMap[businessLine][ticketType].push(data[i]);
		}
		console.log(dataMap);
		return dataMap;
	}
	function notifyDataChange(myData) {
		var businessLine = getBusinessLine(myData);
		businessLineIdText.options.length = 0;
		for (var i = 0; i < businessLine.length; i++) {
			businessLineIdText.options.add(new Option(businessLine[i]));
		}
		businessLineIdText.onchange = function() {
			var ticketType = getTicketType(myData);
			ticketTypeText.options.length = 0;
			for (var i = 0; i < ticketType.length; i++) {
				ticketTypeText.options.add(new Option(ticketType[i]));
			}
			ticketTypeText.onchange();
		}
		ticketTypeText.onchange = function() {
			var selectedBusinessLine = getSelectedValue("businessLineIdText"),
				selectedTicketType = getSelectedValue("ticketTypeText"),
				nameItem = myData[selectedBusinessLine][selectedTicketType];
			seName.options.length = 0;
			for (var i = 0; i < nameItem.length; i++) {
				var item = nameItem[i];
				seName.options.add(new Option(item.name),item.ticketId);
				console.log("nameId = ",item.ticketId);
			}
			seName.onchange();
		}
		seName.onchange = function() {
			console.log("name = ",seName.value);
		}
		businessLineIdText.onchange();
	}
	function getSelectId(id) {
		var id = document.getElementById(id);
		return id;
	}
	function getSelectedValue(id) {
		var id = document.getElementById(id);
		var selectedValue = id.options[id.selectedIndex].value;
		return selectedValue;
	}
	function getBusinessLine(data) {
		var businessLineIdTexts = [];
		for(var item in data) {
			console.log(item);
			businessLineIdTexts.push(item);
		}
		return businessLineIdTexts;
	}
	function getTicketType(data) {
		var ticketTypeTexts = [];
		var selectedBusinessLine = getSelectedValue("businessLineIdText");
		var ticketTypeItems = data[selectedBusinessLine];
		for(var item in ticketTypeItems) {
			ticketTypeTexts.push(item);
		}
		return ticketTypeTexts;
	}
});
