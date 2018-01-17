define(function() {
	var Ajax = function(method,url,data,success,failed){
		var xhr = null;
		if (window.ActiveObject) {
			xhr = new ActiveObject("Microsoft.XMLHTTP");
		} else if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			return null;
		}

		if (method == 'get') {
			if (data) {
				url += '?';
				url += data;
			}
			xhr.open('get',url,true);
			xhr.send();
		}

		if (method == 'post') {
			xhr.open('post',url,true);
			if (data) {
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.send(data);
			}
		}

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				console.log(xhr.responseText);
				var data = JSON.parse(xhr.responseText);
				success(data);
			} else {
				if (failed) {
					console.log(xhr.status);
				}
			}
		}
	}
	return {
		Ajax: Ajax
	}
});
