(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
			arr2[i] = arr[i];
		}return arr2;
	} else {
		return Array.from(arr);
	}
}

var params = window.params = window.location.search.replace('?', '').split('&').reduce(function (p, e) {
	var a = e.split('=');p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);return p;
}, {});
var bus = new Vue();

var vueList = Vue.component('vueList', {
	data: function data() {
		return {
			params: params,
			ConvertedVideoDir: '../videos/converted/',
			RealVideoDir: '../videos/real/',
			PreviewDir: '../videos/gif/',
			PreviewDirStatic: '../videos/img/',
			otvetjson: [],
			hoverstyle: '',
			playerOptions: { autoplay: false, playbackRates: [2, 1.5, 1, 0.5], sources: [{ src: "http://vjs.zencdn.net/v/oceans.mp4" }], poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg" },
			inmodal: '',
			updbtn: 'Update this list',
			btnalreadyuploaded: 'Load already uploaded videos'
		};
	},
	methods: {
		hoverStyleObject: function hoverStyleObject(e) {
			//console.log(this);console.log(e);
			this.hoverstyle = 'cursor: pointer';
		},
		showModal: function showModal(e) {
			this.inmodal = e;
			this.$refs.myModalRef.show();
		},
		hideModal: function hideModal(e) {
			//  console.log(e);		  console.log(this);
			this.$refs.myModalRef.hide();
			this.inmodal = '-';
			//[this.playerOptions][0].sources[0].src = '';
			this.$refs.videoPlayer.player.pause();
		},
		load: function load(e) {
			var _this = this;

			var btnTMPname = this.updbtn;
			this.updbtn = 'Loading...';
			var that = this;
			//that.$http.get("?action=viewvideojson&add_vid=0&def_uid=BC7512E3-19B0-425A-8BE9-0DEA33E88077&insp_uid=EC6ED7C3-EC61-4B72-A6F9-5F5DBBB67654")
			that.$http.get('?action=viewvideojson&add_vid=0&def_uid=' + params.def_uid + '&insp_uid=' + params.insp_uid).then(function (response) {
				/*console.log(response.bodyText);  */
				var otv = window.otv = JSON.parse(response.bodyText.replace(/\s+/g, '').replace(/,}/gim, '}')).Videos.File;
				/*	console.log(otv);*/
				//				that.otvetjson.push(otv);
				if (!Array.isArray(otv)) {
					if (_this.otvetjson.length == 0) {
						//vueEx._data или that1._data
						var ar = new Object(otv);
						ar.Date = new Date(ar.Date).toLocaleString();
						that.otvetjson.push(ar);
					}
				} else {
					window.otv = otv = otv.sort(function (a, b) {
						return new Date(b.Date) - new Date(a.Date);
					});
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = otv[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var i = _step.value;
							i.Date = new Date(i.Date).toLocaleString();
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}

					that.otvetjson = otv;
				}
				/*function compare(a, b) 		{ if (a.Date > b.Date) return -1; if (a.Date < b.Date) return 1; return 0;	}
    if (this.otvetjson.length === 0) that.otvetjson = []; that.otvetjson = this.otvetjson.sort(compare);*/
			}).catch(function (err) {
				console.log('FAILURE!!');console.log(err);
			}).then(function () {
				that.updbtn = btnTMPname;
			});
		}
	},
	beforeCreate: function beforeCreate() {
		var that1 = this;
		window.that1 = this;
		bus.$on('id-selected', function (id) {
			that1.load();
		});
	},

	computed: {
		player: function player() {
			return this.$refs.videoPlayer.player;
		},

		modalVideo: function modalVideo() {
			var r = this.inmodal;
			if (typeof r == 'number') {
				//console.log('ЧИСЛО!! \n=this.otvetjson>'); console.log(this.otvetjson); console.log('r=>'); console.log(r); console.log('this.otvetjson[r]=>'); console.log(this.otvetjson[r]);
				var ret = this.otvetjson[r];
				/*console.log('this.playerOptions'); console.log(this.playerOptions); console.log('[this.playerOptions][0].sources[0].src=>'); 
    console.log([this.playerOptions][0].sources[0].src);
    console.log('this.ConvertedVideoDir+([ret][0].Status==2)?[ret][0].VidUID+".mp4":[ret][0].FileName=>')
    */var newUrl = [ret][0].Status == 2 ? this.ConvertedVideoDir + [ret][0].VidUID + ".mp4" : this.RealVideoDir + [ret][0].FileName;
				//console.log(newUrl);
				if ([ret][0].Status == 1) {
					that1.$refs.videoPlayer.player.poster(this.PreviewDirStatic + [ret][0].VidUID + ".jpg"); //vueEx.$refs.videoPlayer или that1. ..);
				} else if ([ret][0].Status == 2) {
					that1.$refs.videoPlayer.player.poster(this.PreviewDir + [ret][0].VidUID + ".gif");
				} else {
					that1.$refs.videoPlayer.player.poster("https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg");
				}
				that1.$refs.videoPlayer.player.src(newUrl); //[this.playerOptions][0].sources[0].src = ([ret][0].Status==2)?this.ConvertedVideoDir+[ret][0].VidUID+".mp4":this.ConvertedVideoDir+[ret][0].FileName;
				return ret;
			} else {
				//console.log('НЕ ЧИСЛО!',r);
				return new Array({ Status: '1', Comment: 1, Date: '1' });
			}
		}
	},
	mounted: function mounted(e) {
		console.log('');console.log(e);console.log(undefined);
	},
	template: '<div><hr/>\n\t\t<h1>Already uploaded</h1>\n\t\t<p align="center"><button v-if=\'!otvetjson[0]\' style="text-align:center; cursor: pointer" class="btn btn-warning cust-anim" @click="load">{{btnalreadyuploaded}}</button></p>\n\t  <p></p>\n\t <template v-if=\'otvetjson[0]\'>\n\t  <table class="table niceTbl" align="center" width="1200px" border="1" cellpadding="10" cellspacing="10"> \n\t   <thead>\n\t\t  <tr>\n\t\t\t  <th width="5">\t\t\t\t\t#\t\t</th> \n\t\t\t  <th align="center" scope="col">\tPreview\t</th> \n\t\t\t  <th scope="col" width="22">\t\tStatus\t</th>\n\t\t\t  <th scope="col">\t\t\t\t\tDate\t</th> \n\t\t\t  <th scope="col">\t\t\t\t\tComment\t</th> \n\t\t  </tr>\n\t   </thead>\n\t   <tfoot>\n\t\t  <tr> \n\t\t\t  <td colspan="5" align="center" v-html="\'Summary: <b>Count:</b> \'+otvetjson.length"></td>\n\t\t  </tr>\n\t   </tfoot>\n\t   <tbody>\n\t\t  <tr :style="hoverstyle" @mouseover="hoverStyleObject" @click="showModal(index2)" align="center" v-for="(file2,index2) in otvetjson" v-bind:index="index2" :key="file2.VidUID"> \n\t\t\t\t<td>{{index2+1}}</td>\n\t\t\t  <td width="200px" > \n\t\n\t\t\t\t<img v-if="file2.Status==2" :src="(file2.Status==2)?PreviewDir+file2.VidUID+\'.gif\':\'\' "></img>\n\t\t\t\t<video v-else preload="false" width="100%" controls="" v-bind:poster="(file2.Status==1)?PreviewDirStatic+file2.VidUID+\'.jpg\' : \'\' ">\n\t\t\t\t\t<source v-bind:src="RealVideoDir+file2.FileName"></source>\n\t\t\t\t</video>\n\t\t\t  </td>\n\t\t\t  <td align="center"><b>{{(file2.Status==0)?"[0] - In queue":(file2.Status==1)?"[1] - Converting...":(file2.Status==2)?"[2] - Converted!":"[3] - Error"}}</b></td>\n\t\t\t  <td align="center"><b>{{file2.Date}}</b></td> \n\t\t\t  <td align="center"><p style="word-break: break-word;">{{file2.Comments}}</p></td>\t\t\t\t \n\t\t  </tr> \n\t   </tbody>\n\t  </table> \n\t<br>\n\t<p align="center"><button style="text-align:center; cursor: pointer" class="btn btn-warning cust-anim" @click="load">{{updbtn}}</button></p>\n\t</template> \n\t\n\t<template v-if=\'false\'>\n\t\t<h1>Video-list is empty!</h1>\n\t</template>\n\t\n\t<div>\n\t  \t<b-modal ref="myModalRef"  @hidden="hideModal" centered :title="[modalVideo][0].Date" ok-only footer-bg-variant="warning">\n\t\t\t<b-container fluid>\n\t\t\t\t<div class="d-block text-center"> \n\t\t\t\t\t<video-player class="video-player-box" ref="videoPlayer" :options="playerOptions" :playsinline="true"> </video-player>\n\t\t\t\t\t<h3 class="modal_title">Comment:</h3>\n\t\t\t\t\t<p class="modal_desc">{{[modalVideo][0].Comments}}</p>\n\t\t\t\t</div>\n\t\t\t</b-container>\n\t\t<div slot="modal-footer" class="w-100">\n\t\t\t<p class="float-left">\n\t\t\t<b>Status:</b> {{([modalVideo][0].Status==0)?"In queue":([modalVideo][0].Status==1)?"Converting... Please wait..":([modalVideo][0].Status==2)?"Converted and ready":"Error"}}</p>\n\t\t\t<b-btn size="sm" class="float-right" variant="primary" @click="hideModal">\n\t\t  Close\n\t\t</b-btn>\n\t  </div>\n\t  </b-modal> \n\t\t<p v-html="\'<b>def_uid:</b> \'+params.def_uid"></p>\n\t\t<p v-html="\'<b>insp_uid:</b> \'+params.insp_uid"></p>\n\t</div>  \n\t</div>'
});
/*
Comments:	"test111"
Date:		"2018-01-24T18:48:00"
FileName:	"C5D36381-F128-386B-B974-0227F9CA8394.mp4"
Status:		"1"
VidUID:		"C5D36381-F128-386B-B974-0227F9CA8394"
*/
var vueEx = new Vue({
	el: "#appVideoUploader",
	data: {
		urlUpload: '?action=savevid',
		uploadPercentage: 0,
		filess: [],
		transferStatus: '',
		dragAndDropCapable: false,
		btnsend: 'SEND'
	},
	mounted: function mounted() {
		//ето грузится после инициализации экземпляра vue (см хуки жизни из доков вуя);
		var drop = document.querySelector('#file-drag-drop');
		function highlight(e) {
			drop.classList.add('isActive');
		}
		function unhighlight(e) {
			drop.classList.remove('isActive');
		}
		function prevent(e) {
			e.preventDefault();e.stopPropagation();
		}
		var highlightEvents = ['dragenter', 'dragover'];
		var unhighlightEvents = ['dragleave', 'drop'];
		[].concat(highlightEvents, unhighlightEvents).forEach(function (ev) {
			drop.addEventListener(ev, prevent, false);
		});
		highlightEvents.forEach(function (ev) {
			drop.addEventListener(ev, highlight, false);
		});
		unhighlightEvents.forEach(function (ev) {
			drop.addEventListener(ev, unhighlight, false);
		});
		this.dragAndDropCapable = this.determineDragAndDropCapable();
		if (this.dragAndDropCapable) {
			['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (evt) {
				this.$refs.fileform.addEventListener(evt, function (e) {
					e.preventDefault();
					e.stopPropagation();
				}.bind(this), false);
			}.bind(this));
			this.$refs.fileform.addEventListener('drop', function (ee) {
				/* Capture the files from the drop event and add them to our local files array.*/
				this.addFileToArray(ee, this);
			}.bind(this));
		};
	},

	methods: {
		load: function load() {
			bus.$emit('id-selected', 1);
		},
		addFileToArray: function addFileToArray(ee, that) {
			var _this2 = this;

			window.eefile = ee;window.thatfile = that;window.thisfile = this; //console.log(ee.target.files); console.log(this);	
			var testAndAdd = function testAndAdd(curfile) {
				var aa = curfile.name.split('.');
				var fileType = '.' + aa[aa.length - 1];
				var test = _this2.formats.includes(fileType);
				if (test) {
					_this2.filess.push({
						name: curfile.name,
						size: curfile.size,
						type: curfile.type,
						url: window.URL.createObjectURL(curfile),
						lastModifiedDate: curfile.lastModifiedDate.toLocaleString(),
						comment: '',
						fileSelf: curfile
					});
					_this2.transferStatus = '';_this2.uploadPercentage = 0; //сброс статуса
					return '';
				} else {
					return curfile.name;
				};
			};
			var fls = ee.target.files || ee.dataTransfer.files;
			if (!fls.length) {
				return;
			};
			var filteredFls = [];
			[].concat(_toConsumableArray(fls)).forEach(function (curfile, index) {
				var a = testAndAdd(curfile);a.length > 0 ? filteredFls.push(a) : '';
			});
			window.filteredFls = filteredFls;
			if (filteredFls.length > 0) {
				var htmlToElement = function htmlToElement(html) {
					var template = document.createElement('template');template.innerHTML = html;return template.content.firstChild;
				};
				var ht = filteredFls.join('</li><li style="text-align:left">');
				var html = htmlToElement('<div>The video-format using in <ol style="padding-left:25px">\n\t\t\t\t<li style="text-align:left"> ' + ht + ' </li></ol>\n\t\t\t\t ' + (filteredFls.length > 1 ? 'are' : 'is') + ' not supported!<br>Please, convert your videos to one of the following supported formats: <br> ' + this.formats + ' <br>\n\t\t\t\t</div>');
				console.log(html);
				swal({
					content: html,
					icon: "warning"
				});
			};
		},
		determineDragAndDropCapable: function determineDragAndDropCapable() {
			/* https://serversideup.net/drag-and-drop-file-uploads-with-vuejs-and-axios/ */
			var div = document.createElement('div');
			return ('draggable' in div || 'ondragstart' in div && 'ondrop' in div) && 'FormData' in window && 'FileReader' in window;
		},

		browseHandler: function browseHandler(ee) {
			this.addFileToArray(ee, this);
			ee.target.value = null; // чистка инпута от файла;
		},
		commentHandler: function commentHandler(ee) {
			/*window.ee = ee; console.log(ee); console.log(this);*/
			this.filess[ee.target.getAttribute("uid")].comment = ee.target.value;
		},
		deleteHandler: function deleteHandler(ev) {
			var id = ev.target.getAttribute("uid");;
			this.filess.splice(id, 1);
		},
		sendHandler: function sendHandler(ev) {
			var btnTMPsendName = this.btnsend;
			var btnTMPname = this.btnalreadyuploaded;
			this.btnalreadyuploaded = this.btnsend = 'Loading...';
			var that = this;
			this.transferStatus = '';
			var formData = new FormData();
			formData.append('def_uid', params.def_uid);
			formData.append('insp_uid', params.insp_uid);
			// formData.append('def_uid', 'BC7512E3-19B0-425A-8BE9-0DEA33E88077');
			// formData.append('insp_uid', 'EC6ED7C3-EC61-4B72-A6F9-5F5DBBB67654');
			var a = vueEx.filess;
			for (var i = 0; i < a.length; i++) {
				formData.append('file_' + i, a[i].fileSelf);
				formData.append('comment_' + i, a[i].comment);
				/*console.log(a[i].fileSelf);*/
			}
			// => CLASSIC METHOD UPLOAD (IE SUPPORT) : =>
			/*let ajax;
   if ('ActiveXObject' in window) { ajax = new window.ActiveXObject('Msxml2.XMLHTTP') } else if ('Microsoft.XMLHTTP' in window) { ajax = new window.ActiveXObject('Microsoft.XMLHTTP') } else { ajax = new window.XMLHttpRequest() }
   ajax.open('POST', URL, true);
   ajax.onreadystatechange = function () { // Call a function when the state changes.
   	if (ajax.readyState == 4 && ajax.status == 200) { console.log('sex!'); };
   }; ajax.send(formData);	*/
			var config = { headers: { 'Accept': 'application/json', 'Content-Type': 'application/octet-stream' },
				onUploadProgress: function onUploadProgress(progressEvent) {
					that.uploadPercentage = Math.round(progressEvent.loaded * 100 / progressEvent.total);
				}
			};
			// formData.set('_method', 'put');  this.$http.put(URL, formData).then((response) => { console.log(response); }) 
			//  axios({ method: "POST", "url": URL, "data":formData, "config":config  }) 
			axios.post(this.urlUpload, formData, config).then(function (res) {
				/*console.log('SUCCESS!! then ->res=>');console.log(res);*/
				that.filess = []; // this.filess = [];
				that.transferStatus = 'Your Files Uploaded Successively!';
				that.btnalreadyuploaded = btnTMPname;that.btnsend = btnTMPsendName;
			}).then(function () {
				that.load();
			}).catch(function (err) {
				console.log('FAILURE!!');console.log(err);that.transferStatus = '<b>Error => </b> ' + err.response + '!';
			}).then(function () {
				that.btnalreadyuploaded = btnTMPname;that.btnsend = btnTMPsendName;
			});
		}
	},
	computed: {
		formats: function formats() {
			return 'mp4,avi,flv,3gp,mpg,mov,qt,wmv,mpeg'.replace(new RegExp(/(\w{1,99})/gim), '.$1').split(',');
		},
		sumVideos: function sumVideos() {
			var sumArr = [];
			var fil = 0;
			this.filess.forEach(function (file) {
				return fil += file.size;
			}); // ES15=> this.filess.forEach(function(file,count){fil +=  file.size;});
			var size0 = (fil / 1000 / 1000).toFixed(1);
			var size1 = size0 > 1000 ? '<b style=\'color:red\'>' + size0 + '</b>' : '<span style=\'color:green\'>' + size0 + '</span>';
			var size = '<b>Size:</b> ' + size1 + ' Mbytes';
			sumArr.push({ length: this.filess.length, size: size });
			return sumArr;
		}
	},
	template: '<div> \n\t<form id="file-drag-drop" ref="fileform"><span class="drop-files">Drop your files here ... </span></form>\n\t<br>\n\t<p align="center">\n\t\t<label class="file-label cust-anim" for="file">Or browse</label>\n\t\t<input type="file" id="file" v-bind:accept="this.formats" @change="browseHandler" name="test" multiple=""/>\n\t</p>\n\t<br>\n\t<template v-if=\'filess[0]\'>\n\t\t<table class="table niceTbl" border="1" align="center" width="1200px"> \n\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t\t<th width="22" scope="col">#</th>\n\t\t\t\t\t<th width="150px" align="center" scope="col">Preview</th>\n\t\t\t\t\t<th scope="col" width="333px">Name</th>\n\t\t\t\t\t<th scope="col">Info</th>\n\t\t\t\t\t<th scope="col">Comment</th>\n\t\t\t\t\t<th scope="col">Delete</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tfoot>\n\t\t\t\t<td colspan="6" align="center"  v-html="\'Summary:  <b>Count:</b> \'+sumVideos[0].length+\' \'+ sumVideos[0].size"></td>\n\t\t\t\t</tr>\n\t\t\t</tfoot>\n\t\t\t<tbody> \n\t\t\t\t<tr align="center" v-for="(file,index) in filess" v-bind:file="file" v-bind:index="index" :key="file.lastModifiedDate"> \n\t\t\t\t\t<td>{{index+1}}</td>\n\t\t\t\t\t<td width="200px"><video width="200px" controls=""><source v-bind:src="file.url" type="video/mp4"/></video></td>\n\t\t\t\t\t<td align="center"><b>{{file.name}}</b></td>\n\t\t\t\t\t<td align="left">\n\t\t\t\t\t\t<b>Size: </b> {{(file.size/1000/1000).toFixed(1)}} Mb\n\t\t\t\t\t\t<br><b>Type: </b>{{file.type}}\n\t\t\t\t\t\t<br><b>Modified: </b>{{file.lastModifiedDate}}\n\t\t\t\t\t</td>\n\t\t\t\t\t<td align="center"><textarea v-bind:uid="index" type=\'text\' @keyup=\'commentHandler\'></textarea></td>\n\t\t\t\t\t<td align="center"><button v-bind:uid="index" class="btn btn-warning btn-delete cust-anim" @click=\'deleteHandler\'>x</button></td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table> \n\t</template> \n\t<div align="center">\n\t\t<p align="center"><button style="text-align:center; cursor: pointer" v-if="filess[0]" class="btn btn-primary cust-anim" @click="sendHandler">{{btnsend}}</button></p>\n\t\t<progress max="100" v-bind:value="uploadPercentage"></progress>\n\t\t<p>{{uploadPercentage}}%</p>\t\n\t\t<p>{{transferStatus}}</p>\n\t</div>\n\t<vueList></vueList>\n\t</div>'
});

window.vueEx = vueEx;

},{}]},{},[1]);
