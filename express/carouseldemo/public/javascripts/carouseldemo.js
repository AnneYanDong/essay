window.onload = function() {
	var images = document.getElementById('images'),
		imgLists = images.getElementsByTagName('img');
		prev = document.getElementById('prev'),
		next = document.getElementById('next'),
		spans = document.getElementsByTagName('span');
	var length = imgLists.length;
	var width = imgLists[0].width;
	function getMinLeft(length) {
		return -width * (length - 1);
	}
	function getMaxLeft(length) {
		return 0;
	}
	//首先是通过prev和next按钮实现图片切换
	function animate(offset) {
		var newOffset = parseInt(images.style.left) + offset;
		if (newOffset < getMinLeft(length)) {
			images.style.left = getMaxLeft(length) + 'px';
			return;
		}
		if (newOffset > getMaxLeft(length)) {
			images.style.left = getMinLeft(length) + 'px';
			return;
		}
		images.style.left = newOffset + 'px';
	}

	var index = 1;
	prev.onclick = function() {
		index -= 1;
		if (index < 1) {
			index = 5;
		}
		spansShow();
		animate(150);
	}

	next.onclick = function() {
		index += 1;
		if (index > 5) {
			index = 1;
		}
		spansShow();
		animate(-150);
	}
	function spansShow() {
		for (var i = 0; i < length; i++) {
			if (spans[i].className == 'active') {
				spans[i].className = '';
			}
		}
		console.log(index);
		spans[index - 1].className = 'active';
	}

	var timer = null;
	function play() {
	    timer = setInterval(function () {
	        next.onclick();
	    }, 1500);
	}
	play();

	var carousel = document.getElementById('carousel');

	function stop() {
		window.clearInterval(timer);
	}
	carousel.onmouseover = stop;
	carousel.onmouseout = play;

	//点击小圆点切换对应的图片
	for (var i = 0; i < length; i++) {
		//闭包问题
		(function(i) {
			spans[i].onclick = function() {
				console.log("点击时自定义的index = ",index);
				var clickIndex = parseInt(this.getAttribute('index'));
				var offset = width * (index - clickIndex);
				animate(offset);
				index = clickIndex;
				spansShow();
			}
		})(i);
	}

	//以下是获取文件后缀名的代码
	// var file = document.getElementById('fileInput');
	// file.onchange = function() {
	// 	console.log(form1.file.value);
	// 	var str = form1.file.value;
	// 	getExtention1(str); //比如xx.pdf,输出pdf
	// 	getExtention2(str); //比如xx.pdf,输出.pdf
	// }
	// function getExtention1(str) {
	// 	if (str.lastIndexOf('.') <= 0) {return '';}
	// 	else {
	// 		if (typeof str != 'string') {return '';}
	// 		var tmpArr = str.split('.');
	// 		if (tmpArr == '' || tmpArr.length == 1) {return ''}
	// 		else console.log(tmpArr.pop());
	// 	}
	// }

	// function getExtention2(str) {
	// 	if (str.lastIndexOf('.') <= 0) {return '';}
	// 	else {
	// 		var reg = /\.(\w+)$/;
	// 		var tmpArr = reg.exec(str);
	// 		console.log("tmpArr:",tmpArr);
	// 		console.log("tmpArr:",tmpArr.length);
	// 		if (tmpArr == null || tmpArr.length == 1) {return '';}
	// 		else {console.log(tmpArr[0]);}
	// 	}
	// }
}