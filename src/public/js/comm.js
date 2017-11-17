/**
 * @file 工具类
 * @time 2016-04-21
 * @author 刘勇 */

define(function (require, exports, module) {
	/**
	 * @name 新开窗口
	 * @discribe 新开窗口在IOS中如果原路径url中带有锚点会导致 新开的地址错误
	 * @author 刘勇
	 * @params openData 与原 mui.openWindow中的参数个数一致 只对url修改
	 * */
	var SERVICE = require('./config').SERVICE;
	var APIS = require('./config').APIS;
	var postFlag = 0;
	var requestCount = 0;
	var commMuiVueRt = {
		openWindow: function (openData) {
			if (!(
				openData.id && typeof (
					openData) === 'object')) {
				mui.alert('参数不规范', '柚客', function () {
					return;
				});
			}
			var openWindowData = {};
			for (var key in openData) {
				if (key === 'url') {
					openWindowData[key] = openData[key];
					if (window.plus) {
						if (plus.os.name.toLowerCase() === 'ios') {
							var hostUrl = window.location.href;
							if (hostUrl.indexOf('#') > 0) {
								hostUrl = hostUrl.substring(0, hostUrl.indexOf('#'));
								hostUrl = hostUrl.substring(0, hostUrl.lastIndexOf('/') + 1);
								openWindowData[key] = hostUrl + openData[key];
							}
						}
					} else {
						console.log('12321312');
					}
				} else {
					openWindowData[key] = openData[key];
				}
			}
			openData.extras = openData.extras || {};
			localStorage.setItem('param_extras', JSON.stringify(openData.extras));
			var viewUrl = openWindowData.viewUrl || openWindowData.url;
			viewUrl = viewUrl.replace('..', 'package');
			this.goView({
				'apiJson': {
					'isTrue': true,
					'urlPort': viewUrl,
					'isBack': openWindowData.isBack || 0,
					'urlPortPc': openWindowData.url
				}
			});
		},
		/**
		 * 21.打开新的webView，并跳用新webView中页面上的funtion
		 * 参数 json
		 * 'apiJson': {
				 *    'isTrue': true, //配合api15的参数callFun一起用
				 *    'urlPort': '', //路由路径 如:activity/index.html#!/detailPage/customer_activity_detail
				 *    'urlPortPc': '' //pc测试路径
				 * }
		 */
		goView: function (param) {
			var jsonParam = param.apiJson || {};
			jsonParam.param = jsonParam.param || '';
			if (!mui.os.ios) {
				jsonParam.urlPortPc = '';
				var src = 'goView(' + JSON.stringify(jsonParam) + ')';
				var iframe = document.createElement('iframe');
				iframe.setAttribute('src', src);
				iframe.setAttribute('style', 'display:none;');
				document.body.appendChild(iframe);
				setTimeout(function () {
					document.body.removeChild(iframe);
				}, 200);
			} else if (mui.os.android) {
				kndfunc.goView(JSON.stringify(jsonParam));
			} else {
				window.open(jsonParam.urlPortPc);
			}
		},
		/**
		 * 返回前一个webView
		 * 参数 json/null
		 * 'apiJson': {
				 *    'fn': '', //当前功能标示
				 *    'isBack': '1',
				 *    'callFun': '', //返回到上一个webView时,需要调用的function的名称, 注:安卓需要配合goView中的参数isTrue=true才能实现
				 *    'param': {} //上一个参数的参数
				 * }
		 * result null
		 */
		goNative: function (param) {
			param = param || {};
			var jsonParam = param.apiJson;
			jsonParam = jsonParam ? JSON.stringify(jsonParam) : '';
			if (mui.os.ios) {
				setTimeout(function () {
					var src = 'goNative(' + jsonParam + ')';
					var iframe = document.createElement('iframe');
					iframe.setAttribute('src', src);
					iframe.setAttribute('style', 'display:none;');
					document.body.appendChild(iframe);
					setTimeout(function () {
						document.body.removeChild(iframe);
					}, 200);
				}, 50)
			} else if (mui.os.android) {
				kndfunc.goNative(jsonParam);
			} else {
				console.log('====goNative===' + jsonParam);
			}
		},
		/**
		 * @name 获取加载数据提示框
		 * @dis  兼容网页访问时的错误
		 * */
		loading: {
			show: function (title) {
				var oDiv = document.getElementById('loading');
				if (oDiv) {
					oDiv.parentNode.removeChild(oDiv);
				}
				oDiv = document.createElement("div");
				oDiv.setAttribute("class", "loading");
				oDiv.setAttribute("id", "loading");
				oDiv.innerHTML = '<div><a><div></div><span>'+title+'</span></a><a onclick="hideMask()" class="delete mui-icon mui-icon-load-delete"></a></div>';
				document.body.appendChild(oDiv);
				var self = this;
				window['hideMask'] = function () {
					self.hide();
				};
			},
			hide: function () {
				try {
					document.getElementById("loading").setAttribute('style', 'display:none;');
				} catch (e) {}
			}
		},
		/**
		 * @name 打开聊天界面
		 * @dis
		 * */
		openSendMessage: function (json) {
			var __info = window.localStorage.getItem('_loginInfo');
			var loginInfo = JSON.parse(__info || '{}');
			var photoImg = json.photo || json.imgUrl;
			if (photoImg) {
				if (photoImg.indexOf('http://') < 0) {
					photoImg = SERVICE + '/' + photoImg;
				}
			} else {
				if (json.sex === 2) {
					photoImg = '../main/images/woman.png';
				} else {
					photoImg = '../main/images/man.png';
				}
			}
			var LOCALCHAT = window.localStorage.getItem('LOCALCHAT') || '{}';
			LOCALCHAT = JSON.parse(LOCALCHAT);
			console.log('顾客ID' + json.id);
			this.openWindow({
				id: '../chat/chat.html',
				url: json.urlPc || '../chat/chat.html',
				viewUrl: '../chat/chat.html',
				extras: {
					msgs: LOCALCHAT['session-' + json.id] || [],
					customerName: json.name,
					curCustonerId: json.id,
					customerPhoto: photoImg,
					loginInfo: loginInfo,
					action: 'OPEN_CHAT_BY_ID'
				}
			});
		},
		/**
		 * @name 统一请求入口
		 * @dis
		 * */

		ajax: function (postData) {
			var self = this;
			var backMsg = {
				code: -1,
				message: ''
			};
			if (!(
				postData.url && typeof (
					postData.url) === 'string')) {
				if (typeof (
						postData.error) === 'function') {
					backMsg.message = '请求地址无效';
					postData.error(backMsg);
					return;
				}
				mui.alert('请求地址无效', '柚客', function () {
				});
				return;
			}
			if (!(
				typeof (
					postData.error) === 'function' && typeof (
					postData.success) === 'function')) {
				mui.alert('请求回调参数错误', '柚客', function () {
				});
				return;
			}
			var loading = this.loading;
			loading.show('加载中...');
			postData.data = postData.data || {};
			console.log('请求地址:   ' + postData.url);
			console.log('请求参数:   ' + JSON.stringify(postData.data));
			Vue.http({
				url: postData.url,
				method: postData.type ? postData.type : 'POST',
				data: postData.data,
				timeout: 10000
			}).then(function (response) {
				// console.log('--------成功回调---' + JSON.stringify(response));
				loading.hide();
				if (!response.data.status) {
					if (response.data.loginErrorCode === -1) {
						if (postFlag > 1) {
							return;
						}
						postFlag++;
						/* 会话过期 重新发起请求 */
						self.restoreCookie(
							function (response) {
								self.ajax(postData);
							}
						);
					} else {
						postData.success(response);
					}
				} else {
					postFlag = 0;
					postData.success(response);
				}
			}, function (response) {
				postFlag++;
				console.log('请求失败error' + JSON.stringify(response));
				loading.hide();
				if (response.status === 0) {
					mui.alert('请检查网络环境', '柚客');
				} else {
					mui.alert(response.statusText + ':' + JSON.stringify(response.status), '柚客');
				}
				postData.error(response);
			});
		},
		getUserInfo: function (flag) {
			var loginInfo = window.localStorage.getItem('_loginInfo') || '{}';
			loginInfo = JSON.parse(loginInfo);
			if (!flag) {
				return loginInfo;
			}
			if (typeof flag === 'string') {
				return loginInfo[flag];
			}
		},
		getLoginInfo: function (param) {
			/* 获取用户信息 */
			window['setLoginInfo'] = function (result) {
				if (typeof result == 'string') {
					result = JSON.parse(result);
				}
				var resultData = {};
				resultData.loginName = result.loginName;
				resultData.password = result.password;
				resultData.userId = result.id;
				window.localStorage.setItem('_loginInfo', JSON.stringify(resultData));
				param.callback(resultData);
				window['setLoginInfo'] = null;
			};
			var jsonParam = param.apiJson || {};
			jsonParam.sCallback = 'setLoginInfo';
			jsonParam = JSON.stringify(jsonParam);
			if (mui.os.ios) {
				setTimeout(function () {
					var src = 'getLoginInfo(' + jsonParam + ')';
					var iframe = document.createElement('iframe');
					iframe.setAttribute('src', src);
					iframe.setAttribute('style', 'display:none;');
					document.body.appendChild(iframe);
					setTimeout(function () {
						document.body.removeChild(iframe);
					}, 200);
				}, 50);
			} else if (mui.os.android) {
				kndfunc.getLoginInfo(jsonParam);
			} else {
				window['setLoginInfo']({
					"loginName": "crmyk2",
					"userName": "林标明",
					"password": "123456",
					"id": 21,
					"mchlParam": {
						"userAgent": window.navigator.userAgent,
						"appKey": "547bca33-3af0-4cba-b01f-3bc739a64a71",
						"osVersion": "21",
						"imei": "869334020663632",
						"appVersion": "1.44.20161229",
						"versionType": "ENABLE",
						"deviceType": "phone",
						"bizInput": {}
					},
					"isUpdate": 1,
					"appVersion": "20170209.1"
				});
			}
		},
		downloadApp: function (cb) {
			window['downloadAppFinish'] = function (result) {
				if (typeof result == 'string') {
					result = JSON.parse(result || '{}');
				}
				if (typeof cb == 'function') {
					cb(result);
				}
			};
			var jsonParam = {};
			jsonParam.sCallback = "downloadAppFinish";
			jsonParam = JSON.stringify(jsonParam);
			if (mui.os.ios) {
				setTimeout(function () {
					var src = 'downloadApp(' + jsonParam + ')';
					var iframe = document.createElement('iframe');
					iframe.setAttribute('src', src);
					iframe.setAttribute('style', 'display:none;');
					document.body.appendChild(iframe);
					setTimeout(function () {
						document.body.removeChild(iframe);
					}, 200);
				}, 50);
			} else if (mui.os.android) {
				kndfunc.downloadApp(jsonParam);
			} else {
				console.log('===检查更新====');
			}
		},
		compHostUrl: function (url) {
			var hostUrl = url;
			if (typeof (
					hostUrl) === 'string' && hostUrl.indexOf('http') !== 0) {
				hostUrl = SERVICE + hostUrl;
			}
			return hostUrl;
		},
		restoreCookie: function (fn) {
			var self = this;
			console.log('维护会话请求参数' + self.getUserInfo('loginName') + ':' + self.getUserInfo('password'));
			var postDataLogin = {
				url: APIS.userLogin,
				data: {
					userName: self.getUserInfo('loginName'),
					password: self.getUserInfo('password')
				},
				success: function (response) {
					if (response.data.status === true) {
						var resultData = response.data.data || {};
						resultData.loginName = self.getUserInfo('loginName');
						resultData.password = self.getUserInfo('password');
						resultData.mchlParam = self.getUserInfo('mchlParam');
						resultData.isUpdate = parseInt(self.getUserInfo('isUpdate') || "0");
						resultData.appVersion = self.getUserInfo('appVersion');
						resultData.userId = self.getUserInfo('userId');
						window.localStorage.setItem('_loginInfo', JSON.stringify(resultData));
						if (typeof fn == 'function') {
							fn();
						}
					} else {
						mui.alert(response.errorMessage, '柚客');
					}
				},
				error: function (response) {
					self.restoreCookie();
				}
			};
			self.ajax(postDataLogin);
		},
		extend: function (to, from) {
			var keys = Object.keys(from);
			var i = keys.length;
			while (i--) {
				to[keys[i]] = from[keys[i]];
			}
			return to;
		},
		/**
		 * @name 统一获取上传图片
		 * @param option 请求参数
		 *      {
         *      mode: 0; 0:拍照， 1：相册选择
         *      quality: 50 压缩质量0~100， 默认50
         *      }
		 * */
		getPicture: function (option, success) {
			var self = this;
			option = this.extend({
				mode: '0'
			}, option);
			if (option.mode == 1) {
				// 相册选择
				//this.getGalleryPic(option, success);
				self.fromImgLibrary({
					'apiJson': {
						'backType': 2,
						'wDivisor': '1024',
						'hDivisor': '780',
						'uploadUrl': APIS.upload_file
					},
					'callback': function (resultData) {
						self.returnSuccess(resultData, success);
					}
				});
			} else {
				// 拍照
				//this.getCameraPic(option, success);
				self.goPhoto({
					'apiJson': {
						'backType': 2,
						'wDivisor': '1024',
						'hDivisor': '780',
						'uploadUrl': APIS.upload_file
					},
					'callback': function (resultData) {
						self.returnSuccess(resultData, success);
					}
				});
			}
		},
		returnSuccess: function (resultData, success) {
			var arrResult = [];
			var result = {};
			var photoUrl = resultData.photo || "";
			var originUrl = resultData.imgPath || "";
			/* 后缀 */
			result.extension = photoUrl.substring(photoUrl.lastIndexOf('.') + 1, photoUrl.length);
			/* 文件名 */
			result.fileName = photoUrl.substring(photoUrl.lastIndexOf('/') + 1, photoUrl.length);
			/* 文件路径 */
			result.filePath = photoUrl.substring(0, photoUrl.lastIndexOf('/') + 1);
			result.md5 = "";
			/* 源文件名 */
			result.originName = originUrl.substring(originUrl.lastIndexOf('/') + 1, originUrl.length);
			/* 文件大小 */
			result.size = resultData.size;
			arrResult.push(result);
			success(arrResult, photoUrl);
		},
		goPhoto: function (param) {
			var loading = this.loading;
			window['photoFinish'] = function (result) {
				if (typeof result == 'string') {
					result = JSON.parse(result);
				}
				if (result.isUpload) {
					loading.show('正在上传...');
					return;
				}
				loading.hide();
				if (result.status == 'cancel') {
					window['photoFinish'] = null;
					return;
				}
				result.status = result.status + '';
				if (result.status === '1' || (result.status == false && param.apiJson.uploadUrl)) {
					mui.alert(result.msg || '上传失败，请重试！', '提示');
					window['photoFinish'] = null;
					return;
				}
				if (!result.photo && (mui.os.ios || mui.os.android)) {
					window['photoFinish'] = null;
					return;
				}
				param.callback(result);
				window['photoFinish'] = null;
			};
			var jsonParam = param.apiJson || {};
			jsonParam.sCallback = 'photoFinish';
			jsonParam.fCallback = 'photoFinish';
			jsonParam = JSON.stringify(jsonParam);
			if (mui.os.ios) {
				var src = 'goPhoto(' + jsonParam + ')';
				var iframe = document.createElement('iframe');
				iframe.setAttribute('src', src);
				iframe.setAttribute('style', 'display:none;');
				document.body.appendChild(iframe);
				setTimeout(function () {
					document.body.removeChild(iframe);
				}, 200);
			} else if (mui.os.android) {
				capturefunc.goPhoto(jsonParam);
			} else {
				uploadFilePC({
					'url': JSON.parse(jsonParam).uploadUrl,
					onSend: function () {
						window['photoFinish']({
							'isUpload': true
						});
					},
					success: function (retData) {
						loading.hide();
						if ('string' == typeof retData) {
							retData = JSON.parse(retData);
						}
						window['photoFinish'](retData);
					},
					error: function () {
						loading.hide();
						mui.alert('上传失败！', '提示', function () {
						});
					}
				});
			}
		},
		fromImgLibrary: function (param) {
			var loading = this.loading;
			window['fromImgLibraryFinish'] = function (result) {
				if (typeof result == 'string') {
					result = JSON.parse(result);
				}
				if (result.isUpload) {
					loading.show('正在上传...');
					return;
				}
				loading.hide();
				if (result.status == 'cancel') {
					window['fromImgLibraryFinish'] = null;
					return;
				}
				result.status = result.status + '';
				if (result.status === '1' || (result.status == false && param.apiJson.uploadUrl)) {
					mui.alert(result.msg || '上传失败，请重试！', '提示');
					window['fromImgLibraryFinish'] = null;
					return;
				}
				if (!result.photo && (mui.os.ios || mui.os.android)) {
					window['fromImgLibraryFinish'] = null;
					return;
				}
				param.callback(result);
				window['fromImgLibraryFinish'] = null;
			};
			var jsonParam = param.apiJson || {};
			jsonParam.sCallback = 'fromImgLibraryFinish';
			jsonParam.fCallback = 'fromImgLibraryFinish';
			jsonParam = JSON.stringify(jsonParam);
			if (mui.os.ios) {
				var src = 'fromImgLibrary(' + jsonParam + ')';
				var iframe = document.createElement('iframe');
				iframe.setAttribute('src', src);
				iframe.setAttribute('style', 'display:none;');
				document.body.appendChild(iframe);
				setTimeout(function () {
					document.body.removeChild(iframe);
				}, 200);
			} else if (mui.os.android) {
				capturefunc.fromImgLibrary(jsonParam);
			} else {
				uploadFilePC({
					'url': JSON.parse(jsonParam).uploadUrl,
					onSend: function () {
						window['fromImgLibraryFinish']({
							'isUpload': true
						});
					},
					success: function (retData) {
						loading.hide();
						if ('string' == typeof retData) {
							retData = JSON.parse(retData);
						}
						window['fromImgLibraryFinish'](retData);
					},
					error: function () {
						loading.hide();
						mui.alert('上传失败！', '提示', function () {
						});
					}
				});
			}
		},
		goRecord: function (param) {
			var loading = this.loading;
			window['videoFinish'] = function (result) {
				if (typeof result == 'string') {
					result = JSON.parse(result);
				}
				if (result.isUpload) {
					loading.show('正在上传...');
					return;
				}
				loading.hide();
				if (result.status == 'cancel') {
					/* 取消，不处理 */
					window['videoFinish'] = null;
					return;
				}
				result.status = result.status + '';
				if (result.status === '1' || result.status == false) {
					mui.alert(result.msg || '上传失败，请重试！', '提示');
					window['videoFinish'] = null;
					return;
				}
				if (!result.photo && (mui.os.ios || mui.os.android)) {
					window['videoFinish'] = null;
					return;
				}
				var recordTime = (parseFloat(result.recordTime)).toFixed(1);
				if (recordTime > 60) {
					var m = parseInt(recordTime / 60);
					var s = parseInt(recordTime % 60);
					recordTime = m + '′' + s + '″';
				} else {
					recordTime = recordTime + '″';
				}
				result.recordTime = recordTime;
				param.callback(result);
				window['videoFinish'] = null;
			};
			var jsonParam = param.apiJson || {};
			jsonParam.uploadUrl = APIS.upload_file;
			jsonParam.sCallback = 'videoFinish';
			jsonParam.fCallback = 'videoFinish';
			jsonParam = JSON.stringify(jsonParam);
			if (mui.os.ios) {
				var src = 'goRecord(' + jsonParam + ')';
				var iframe = document.createElement('iframe');
				iframe.setAttribute('src', src);
				iframe.setAttribute('style', 'display:none;');
				document.body.appendChild(iframe);
				setTimeout(function () {
					document.body.removeChild(iframe);
				}, 200);
			} else if (mui.os.android) {
				recordingfunc.goRecord(jsonParam);
			} else {
				uploadFilePC({
					'url': JSON.parse(jsonParam).uploadUrl,
					onSend: function () {
						window['videoFinish']({
							'isUpload': true
						});
					},
					success: function (retData) {
						loading.hide();
						if ('string' == typeof retData) {
							retData = JSON.parse(retData);
						}
						retData.recordTime = 2;
						window['videoFinish'](retData);
					},
					error: function () {
						loading.hide();
						mui.alert('上传失败！', '提示', function () {
						});
					}
				});
			}
		},
		openRecord: function (param) {
			var jsonParam = param.apiJson || {};
			jsonParam = JSON.stringify(jsonParam);
			if (mui.os.ios) {
				var src = "openRecord("+jsonParam+")",
					iframe = document.createElement("iframe");
				iframe.setAttribute("src", src);
				iframe.setAttribute("style", "display:none;");
				document.body.appendChild(iframe);
				setTimeout(function() {
					document.body.removeChild(iframe);
				}, 200);
			} else if (mui.os.android) {
				kndfunc.goDownload(jsonParam);
			} else {
				console.log("==========播放语音==========");
			}
		},
		goDownload: function (param) {
			window["downLoadFinish"] = function (result) {
				if (typeof result == "string") {
					result = JSON.parse(result);
				}
				param.callback(result);
				window["downLoadFinish"] = null;
			};
			var jsonParam = param.apiJson||{};
			jsonParam.sCallback = "downLoadFinish";
			jsonParam = JSON.stringify(jsonParam);
			if (mui.os.ios) {
				var src = "goDownload("+jsonParam+")",
					iframe = document.createElement("iframe");
				iframe.setAttribute("src", src);
				iframe.setAttribute("style", "display:none;");
				document.body.appendChild(iframe);
				setTimeout(function() {
					document.body.removeChild(iframe);
				}, 200);
			} else if (mui.os.android) {
				kndfunc.goDownload(jsonParam);
			} else {
				console.log("==========下载==========");
			}
		},
		getGalleryPic: function (option, success) {
			if (!window.plus) {
				mui.alert('plus not ready', '柚客');
				return;
			}
			var self = this;
			plus.gallery.pick(function (p) {
				plus.io.resolveLocalFileSystemURL(p, function (entry) {
					option = self.extend({
						src: p,
						dst: '_doc/img/' + entry.name
					}, option);
					self.compressImage(option, success);
				}, function (e) {
					console.log('读取拍照文件错误：' + e.message);
				});
			}, function (e) {
				console.log('取消选择图片');
			}, {
				filter: 'image'
			});
		},
		getCameraPic: function (option, success) {
			if (!window.plus) {
				mui.alert('plus not ready', '柚客');
				return;
			}
			var self = this;
			var cmr = plus.camera.getCamera();
			cmr.captureImage(function (p) {
				plus.io.resolveLocalFileSystemURL(p, function (entry) {
					option = self.extend({
						src: p,
						dst: '_doc/img/' + entry.name
					}, option);
					self.compressImage(option, success);
				}, function (e) {
					console.log('读取拍照文件错误：' + e.message);
				});
			}, function (e) {
				console.log('失败：' + e.message);
			}, {
				filename: '_doc/camera/',
				index: 1
			});
		},
		/**
		 * @name 上传文件
		 * @param file 本地文件路径
		 * */

		upload: function (file, imgFullPath, success, api) {
			if (!window.plus) {
				mui.alert('plus not ready', '柚客');
				return;
			}
			var wt = plus.nativeUI.showWaiting();
			var task = plus.uploader.createUpload(SERVICE + (
				api || '/api/v2/attachment/upload'),
				{method: 'POST'},
				function (t, status) { // 上传完成
					var resultData = t.responseText;
					if (status === 200) {
						if ('object' !== typeof resultData) {
							resultData = JSON.parse(resultData);
						}
						if (api && typeof success === 'function') {
							success(resultData.photo, imgFullPath);
							mui.alert('上传成功', '柚客');
							wt.close();
							return;
						}
						if (resultData && resultData.status === true &&
							resultData.data &&
							resultData.data.length > 0) {
							if (typeof success === 'function') {
								success(resultData.data, imgFullPath);
							}
							mui.alert('上传成功', '柚客');
						} else {
							console.log('fail', resultData);
						}
					} else {
						console.log('fail--' + status + '--' + t.responseText);
					}
					wt.close();
				}
			);
			task.addData('module', 'customer');
			task.addFile(file, {key: 'file'});
			task.start();
		},
		compressImage: function (option, success) {
			var self = this;
			option = this.extend({
				overwrite: true,
				quality: 50
			}, option);
			plus.nativeUI.showWaiting();
			plus.zip.compressImage(option,
				function (e) {
					plus.nativeUI.closeWaiting();
					var imgFullPath = '';
					plus.io.resolveLocalFileSystemURL(option.dst, function (entry) {
						imgFullPath = 'file:///' + entry.fullPath;
						self.upload(option.dst, imgFullPath, success, option.api);
					}, function () {
						console.log('读取本地压缩文件错误：' + e.message);
					}, {filter: 'image'});
				}, function (e) {
					plus.nativeUI.closeWaiting();
					console.log(e);
				});
		},
		setKndTime: function (param) {
			window['setKndTimeFinish'] = function (result) {
				if (typeof result == 'string') {
					result = JSON.parse(result);
				}
				param.callback(result);
				window['setKndTimeFinish'] = null;
			};
			var jsonParam = param.apiJson || {};
			jsonParam.sCallback = 'setKndTimeFinish';
			var endYear = new Date().getFullYear() + 10;
			if (!jsonParam.kndMinTime) {
				jsonParam.kndMinTime = '1900-01-01';
			}
			if (!jsonParam.kndMaxTime) {
				jsonParam.kndMaxTime = endYear + '-12-30';
			}
			jsonParam = JSON.stringify(jsonParam);
			if (mui.os.android) {
				calendarfunc.setKndTime(jsonParam);
			} else if (mui.os.ios) {
				var src = 'setKndTime(' + jsonParam + ')',
					iframe = document.createElement('iframe');
				iframe.setAttribute('src', src);
				iframe.setAttribute('style', 'display:none;');
				document.body.appendChild(iframe);
				setTimeout(function () {
					document.body.removeChild(iframe);
				}, 200);
			} else {
				var returnVal = "";
				jsonParam = JSON.parse(jsonParam || '{}');
				if (jsonParam.format == 'yyyy') {
					returnVal = "2017";
				} else if (jsonParam.format == 'yyyy-MM') {
					returnVal = "2017-01";
				} else if (jsonParam.format == 'yyyy-MM-dd HH:mm') {
					returnVal = "2017-01-06 10:10";
				} else if (jsonParam.format == 'HH:mm') {
					returnVal = "2017-01-06 10:10";
				} else {
					returnVal = "2017-01-06";
				}
				window['setKndTimeFinish']({
					'result': returnVal
				});
			}
		},
		// number:  电话号码
		// confie: 是否直接拨打电话
		toTel: function (number, confirm) {
			var jsonParam = {
				'phoneNum': number
			};
			if (mui.os.ios) {
				var src = 'openPhone(' + JSON.stringify(jsonParam) + ')';
				var iframe = document.createElement('iframe');
				iframe.setAttribute('src', src);
				iframe.setAttribute('style', 'display:none;');
				document.body.appendChild(iframe);
				setTimeout(function () {
					document.body.removeChild(iframe);
				}, 200);
			} else if (mui.os.android) {
				kndfunc.openPhone(JSON.stringify(jsonParam));
			} else {
				console.log('打电话', jsonParam.phoneNum);
			}
		},
		toMail: function (email) {
			var jsonParam = {
				"recemail": email,
				"emailtitle": "",
				"emailcontent": "",
				"isHtml": "",
				"attachmentName": "",
				"attachmentBase64": ""
			};
			if (mui.os.android) {
				kndfunc.openEmail(JSON.stringify(jsonParam));
			} else {
				window.location.href = 'mailto:' + email;
			}
		},
		/*
		 numArr: 数组  电话数组 ['18611497504', '15811140520'];
		 msg: 发送的内容
		 */
		toMessage: function (numArr) {
			var jsonParam = {
				'to': numArr.join(','),
				'message': ''
			};
			if (mui.os.ios) {
				var src = 'openMsg(' + JSON.stringify(jsonParam) + ')';
				var iframe = document.createElement('iframe');
				iframe.setAttribute('src', src);
				iframe.setAttribute('style', 'display:none;');
				document.body.appendChild(iframe);
				setTimeout(function () {
					document.body.removeChild(iframe);
				}, 200);
			} else if (mui.os.android) {
				kndfunc.openMsg(JSON.stringify(jsonParam));
			}
		},
		toExit: function () {
			if (mui.os.ios) {
				var src = 'toExit()';
				var iframe = document.createElement('iframe');
				iframe.setAttribute('src', src);
				iframe.setAttribute('style', 'display:none;');
				document.body.appendChild(iframe);
				setTimeout(function () {
					document.body.removeChild(iframe);
				}, 200);
			} else if (mui.os.android) {
				kndfunc.toExit();
			} else {
				console.log('====exit===');
			}
		}
	};
	var frameCount = 0;
	function uploadFilePC(potions) {
		document.querySelector('#uploadPc') && document.querySelector('#uploadPc').remove();
		var frag = document.createDocumentFragment();
		var $form = document.createElement('form');
		$form.setAttribute('id', 'uploadPc');
		$form.setAttribute('action', potions.url);
		$form.setAttribute('method', 'post');
		$form.setAttribute('enctype', 'multipart/form-data');
		$form.style.display = 'none';
		var $inputFile = document.createElement('input');
		$inputFile.setAttribute('id', 'uploadFiles');
		$inputFile.setAttribute('name', 'file');
		$inputFile.setAttribute('type', 'file');
		$form.appendChild($inputFile);
		var $input = document.createElement('input');
		$input.setAttribute('name', 'module');
		$input.setAttribute('type', 'text');
		$input.setAttribute('value', 'customer');
		$form.appendChild($input);
		frag.appendChild($form);
		document.body.appendChild(frag);
		$inputFile.addEventListener('change', function () {
			fileUpload();
		});
		$inputFile.click();
		return;

		function fileUpload() {
			var fileValue = $inputFile.value;
			// var imgExt = fileValue.substring(fileValue.lastIndexOf('.'), fileValue.length);
			var imgSize = document.getElementById('uploadFiles').files[0].size / 1024;
			if (!fileValue) {
				return;
			}
			/* if ('.jpg|.jpeg|.gif|.bmp|.png|'.indexOf(imgExt.toLocaleLowerCase() + '|') == -1) {
			 mui.alert('上传图片格式不正确，请重新上传！', '提示', function(){});
			 return;
			 }*/
			if (!(imgSize > 0 && imgSize <= 12048)) {
				potions.error();
				return;
			}
			var form = $form;
			var id = 'jqFormIO' + frameCount++;
			var $io = document.createElement('iframe');
			$io.setAttribute('id', id);
			$io.setAttribute('name', id);
			$io.style.position = 'absolute';
			$io.style.top = '-1000px';
			$io.style.left = '-1000px';
			var io = $io;
			setTimeout(function () {
				document.body.appendChild($io);
				$io.attachEvent ? $io.attachEvent('onload', cb) : $io.addEventListener('load', cb, false);
				// var encAttr = form.encoding ? 'encoding' : 'enctype';
				var t = $form.getAttribute('target');
				$form.setAttribute('target', id);
				$form.setAttribute('method', 'POST');
				$form.setAttribute('encAttr', 'multipart/form-data');
				$form.setAttribute('action', potions.url);
				potions.onSend();
				form.submit();
				$form.setAttribute('target', t); // reset target
			}, 10);

			function cb() {
				io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);
				var ok = true;
				try {
					var data, doc;
					doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
					data = doc.body ? doc.body.innerText : null;
					if (potions.dataType === 'json') {
						data = JSON.parse(data) || {};
					}
				} catch (e) {
					ok = false;
				}

				if (ok) {
					if (data) {
						console.log('===上次结果===' + data);
						potions.success(data);
					} else {
						potions.error();
					}
				} else {
					potions.error();
				}
				setTimeout(function () {
					$io.remove();
					$form.remove();
				}, 100);
			}
		}
	}
	return commMuiVueRt;
});
