var tabId = null;
var processFlag = false;

chrome.browserAction.onClicked.addListener(function () {

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (tabs[0].url.indexOf('mail.google.com') >= 0) {
			tabId = tabs[0].id;
			chrome.tabs.sendMessage(tabId, {
				from: "background",
				action: 'toggle'
			});

			if (!processFlag) {
				chrome.identity.getAuthToken({
					interactive: true
				}, function (token) {
					if (token) {
						showMessages(token);

					}
				});
				// chrome.identity.getProfileUserInfo((userInfo) => {
				// 	var data = userInfo.email;
				// 	$.ajax({
				// 		type: 'POST',
				// 		url: 'http://localhost/test/insert.php',
				// 		data: { email: data },
				// 		success: function (response) {
				// 			// console.log("response::", response)
				// 		}, error: function (e) {
				// 			console.log(e);
				// 		}
				// 	});

				// });
			}

			processFlag = true;

		}
	})
});



var g_token = null;
var count = 0;
var arrayData = new Array;

function showMessages(token, userId = "me") {

	g_token = token;
	getStuff(userId, token);

}

var getStuff = async (userId, token) => {

	let nextPageToken = '';
	while (true) {

		// let { nextPageToken, hello, world } = await fetchStuff(nextPageToken, userId, token);
		nextPageToken = await fetchStuff(nextPageToken, userId, token);
		if (!nextPageToken) {
			break;
		}
	}
	console.log("this part is for last implemented part...", arrayData);
	chrome.runtime.sendMessage({
		from: "background",
		data: arrayData,
		token: g_token,
		action: 'list',
		pageTotalCnt: count
	});
};

var fetchStuff = async (nextPageToken, userId, token) => {

	return new Promise(resolve => {
		var url = "https://www.googleapis.com/gmail/v1/users/" + userId + "/messages?maxResults=20&q=in%3Ainbox%20has%3Aattachment&pageToken=" + nextPageToken;
		fetch(url, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token
			}
		}).then((res) => {
			return res.json();
		}).then(function (obj) {

			Array.prototype.push.apply(arrayData, obj.messages)
			nextPageToken = obj.nextPageToken;
			count++;
			if (count === 15) {
				return;
			}
			// newObj.number = count;
			resolve(nextPageToken);
			// resolve({nextPageToken, hello, world});
		});
	});
}

