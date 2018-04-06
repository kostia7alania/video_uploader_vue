var tmpInput = ` 
<div> 
	<form id="file-drag-drop" ref="fileform"><span class="drop-files">Drop your files in this area ... </span></form>
		<p align="center">
			<label class="file-label" for="file">Or browse</label>
			<input type="file" id="file" v-bind:accept="this.formats" @change="someHandler" name="test" multiple=""/>
		</p>
<br/>
<template v-if='filess[0]'>
<table class="table" align="center" width="1200px"> 
	<thead>
		<tr>
			<th width="22" scope="col">#</th>
			<th width="150px" align="center" scope="col">Preview</th>
			<th scope="col" width="333px">Name</th>
			<th scope="col">Info</th>
			<th scope="col">Comment</th>
			<th scope="col">Delete</th>
		</tr>
    </thead>
	  <tfoot>
		   <td colspan="6" align="center"  v-html="'Summary:  <b>Count:</b> '+sumVideos[0].length+' '+ sumVideos[0].size"></td>
		</tr>
  	</tfoot>
  	<tbody> <tr align="center" v-for="(file,index) in filess" v-bind:file="file" v-bind:index="index" :key="file.lastModifiedDate"> 
		<td>{{index+1}}</td>
	 	<td width="200px"><video width="200px" controls=""><source v-bind:src="file.url" type="video/mp4"/></video></td>
		<td align="center"><b>{{file.name}}</b></td>
		<td align="left">
			<b>Size: </b> {{(file.size/1000/1000).toFixed(1)}} Mb
			<br/><b>Type: </b>{{file.type}}
			<br/><b>Modified: </b>{{file.lastModifiedDate}}
		</td>
		<td align="center"><textarea v-bind:uid="index" type='text' @keyup='commentHandler'></textarea></td>
		<td align="center"><button v-bind:uid="index" class="btn btn-warning btn-delete" @click='deleteHandler'>x</button></td>
	</tr>
  </tbody>
</table> 
</template>

	<div align="center">
		<button style="width:100%; cursor: pointer" v-if="filess[0]" class="btn btn-primary" @click="sendHandler">{{btnsend}}</button>
		<progress max="100" v-bind:value="uploadPercentage"></progress>
		<p>{{uploadPercentage}}%</p>	
		<p>{{transferStatus}}</p>
	</div>


	<hr/>
	<h1>Already uploaded</h1>

  <button v-if='!otvetjson[0]' style="width:100%; cursor: pointer" class="btn btn-warning" @click="load">{{btnalreadyuploaded}}</button>
  <p></p>
 <template v-if='otvetjson[0]'>
  <table class="table" align="center" width="1200px" border="0" cellpadding="10" cellspacing="10"> 
   <thead>
	  <tr>
	  	  <th width="22">					#		</th> 
		  <th align="center" scope="col">	Preview	</th> 
		  <th scope="col">					Status	</th>
		  <th scope="col">					Date	</th> 
		  <th scope="col">					Comment	</th> 
	  </tr>
   </thead>
   <tfoot>
	  <tr> 
		  <td colspan="5" align="center" v-html="'Summary: <b>Count:</b> '+otvetjson.length"></td>
	  </tr>
   </tfoot>
   <tbody>
	  <tr align="center" v-for="(file2,index2) in otvetjson" v-bind:index="index2" :key="file2.VidUID"> 
	  	  <td>{{index2+1}}</td>
		  <td width="200px" >
		  	<video width="200px" controls="">
		 	 <source 
		  		v-bind:src="(file2.status==2)?ConvertedVideoDir+file2.VidUID+'.mp4':RealVideoDir+file2.FileName"
				v-bind:poster="(file2.status==2)?PreviewDir+file2.VidUID+'.gif':''"
				v-bind:type="(file2.status==2)?'video/mp4':'video/'+file2.FileName.split('.')[1]"/></video></td>
		  <td align="center"><b>{{(file2.Status==0)?"[0] - In queue":(file2.Status==1)?"[1] - Converting...":(file2.Status==2)?"[2] - Converted!":"[3] - Error"}}</b></td>
		  <td align="center"><b>{{file2.Date}}</b></td> 
		  <td align="center"><span>{{file2.Comments}}</span></td>				 
	  </tr> 
   </tbody>
  </table> 
<br/>
<button style="width:100%; cursor: pointer" class="btn btn-warning" @click="load">{{updbtn}}</button>
</template>

<template v-if='emptyList'>
	<h1>Your video-list is empty! Please, try load you video again or convert it to another format!</h1>
</template>

<p v-html="'<b>def_uid:</b> '+params.def_uid"></p>
<p v-html="'<b>insp_uid:</b> '+params.insp_uid"></p>

</div>
`;/*
Comments:	"test111"
Date:		"2018-01-24T18:48:00"
FileName:	"C5D36381-F128-386B-B974-0227F9CA8394.mp4"
Status:		"1"
VidUID:		"C5D36381-F128-386B-B974-0227F9CA8394"
*/
 const DragAndDropCapable = () => {let div = document.createElement('div'); return ( ( 'draggable' in div ) || ( 'ondragstart' in div && 'ondrop' in div ) ) && 'FormData' in window && 'FileReader' in window; }

 var data = {
	ConvertedVideoDir:  '../videos/converted/',
	RealVideoDir: 		'../videos/real/',
	PreviewDir:			'../videos/gif/',
	uploadPercentage:   0,
	formats: 'mp4,avi,flv,3gp,mpg,mov,qt,wmv'.replace(new RegExp(/(\w{1,99})/gim),'.$1').split(','),
	filess: [],
	transferStatus: '',
	otvetjson: [],
	dragAndDropCapable: false,
	emptyList: false,
	btnsend: 			'SEND',
	updbtn:				'Update this list',
	btnalreadyuploaded: 'Load already uploaded videos'
	};
  
var vueEx = new Vue({
	el: "#appVideoUploader",
	data: data,
	mounted () {
		this.dragAndDropCapable = this.determineDragAndDropCapable();
		if(this.dragAndDropCapable) {
			['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
				this.$refs.fileform.addEventListener(evt, function(e){
				  e.preventDefault();
				  e.stopPropagation();
				}.bind(this), false);
			  }.bind(this));
			  this.$refs.fileform.addEventListener('drop', function(e){ /* Capture the files from the drop event and add them to our local files array.*/
				for ( let i = 0; i < e.dataTransfer.files.length; i++ ){ //this.files.push( e.dataTransfer.files[i] );
					var curfile = window.curFile =  e.dataTransfer.files[i];
					console.log(curfile);
					let aa = curfile.name.split('.');
					let fileType = '.' + aa[aa.length - 1];
					let test = vueEx.formats.includes(fileType);
					if (test){
						vueEx.filess.push
						(
							{name: curfile.name,
							size: curfile.size,
							type: curfile.type,
							url: window.URL.createObjectURL(curfile),
							lastModifiedDate: curfile.lastModifiedDate.toLocaleString(),
							comment: '',
							fileSelf: curfile}    
						);
					} else { 
						alert(`The video-format using in ${curfile.name} is not supported! Please, convert it to another format!`)
					};
				}
			  }.bind(this));  
	 }
	},
	methods:  { 
		determineDragAndDropCapable () { /* https://serversideup.net/drag-and-drop-file-uploads-with-vuejs-and-axios/ */
			var div = document.createElement('div');
			return ( ( 'draggable' in div )
					|| ( 'ondragstart' in div && 'ondrop' in div ) )
					&& 'FormData' in window
					&& 'FileReader' in window;
		  },
		load: function load (e) {
			let btnTMPname = this.updbtn;
			this.updbtn = 'Loading...';
			let that = this;
			//that.$http.get("?action=viewvideojson&add_vid=0&def_uid=BC7512E3-19B0-425A-8BE9-0DEA33E88077&insp_uid=EC6ED7C3-EC61-4B72-A6F9-5F5DBBB67654")
			that.$http.get(`?action=viewvideojson&add_vid=0&def_uid=${this.params.def_uid}&insp_uid=${this.params.insp_uid}`)
			.then((response) => {
				console.log(response.bodyText);  
				let otv = window.otv = JSON.parse(response.bodyText.replace(/\s+/g,'').replace(/,}/gim, '}')).Videos.File;
				console.log(otv);
//				that.otvetjson.push(otv);
				if(!Array.isArray(otv)){
					(vueEx._data.otvetjson.length==0)?that.otvetjson.push(otv):'';
				}else{
					window.otv = otv = otv.sort(function (a, b) { return (new Date(b.Date)) - (new Date(a.Date)) });
					for (let i of otv) { i.Date = new Date(i.Date).toLocaleString(); }
					that.otvetjson = otv;
					this.emptyList = otv.length==0?true:false;
				}
				/*function compare(a, b) 		{
					if (a.Date > b.Date)
						return -1;
					if (a.Date < b.Date)
						return 1;
					return 0;
				}
				if (this.otvetjson.length === 0) that.otvetjson = [];
				that.otvetjson = this.otvetjson.sort(compare);*/
			})
			.catch(function (err) { console.log('FAILURE!!'); console.log(err); })
			.then(() => { that.updbtn = btnTMPname; });
			/*
			var me = this;
			var oReq = new XMLHttpRequest();
			oReq.open("GET", "?action=viewvideojson&add_vid=0&def_uid=BC7512E3-19B0-425A-8BE9-0DEA33E88077&insp_uid=EC6ED7C3-EC61-4B72-A6F9-5F5DBBB67654");
			oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			oReq.addEventListener("success", function (e) {
				window.otvet = e;
				let otvetjson1 = window.otvetjson1 = JSON.parse(e.currentTarget.response.replace(/\s+/g,'').replace(/,}/gim, '}'));
				this.otvetjson.push(otvetjson1);
			console.log(e);
			console.log(otvetjson);
			
		//.replace(/, }/gim, '}');

			});
			oReq.send();*/
		},
		viewapp: function (e) {
			return document.querySelector('#viewapp').innerHTML
		},
		someHandler: function (ee) {
			vueEx._data.transferStatus = ``; vueEx._data.uploadPercentage = 0;
			console.log(ee.target.files);
			console.log(this);
		  let a = ee.target.files || ee.dataTransfer.files, b = '';
		  if (!a.length) {return};
			for(let i = 0; i < a.length; i++){ 
				let aa = a[i].name.split('.');
				let fileType = '.' + aa[aa.length - 1];
				if (vueEx.formats.includes(fileType)){
					vueEx.filess.push(
					  {name: a[i].name,
					   size: a[i].size,
					   type: a[i].type,
					   url: window.URL.createObjectURL(a[i]),
					   lastModifiedDate: a[i].lastModifiedDate.toLocaleString(),
					   comment: '',
					fileSelf: a[i]}
			  );
			  } else { 
				  alert(`The video-format using in ${a[i].name} is not supported! Please, convert it to another format!`)
			  };
			};
		},
		commentHandler: function (ee){
			window.ee = ee; console.log(ee); console.log(this);
			vueEx.filess[ee.target.getAttribute("uid")].comment = ee.target.value;
		},
		deleteHandler: function (ev){
			let id = ev.target.getAttribute("uid");;
			vueEx.filess.splice(id, 1);
		}, 
		sendHandler: function(ev) {
			let btnTMPsendName = this.btnsend;
			let btnTMPname = this.btnalreadyuploaded;
			this.btnalreadyuploaded = this.btnsend = 'Loading...';
			let that = this;
			vueEx.transferStatus = '';
			 let formData = new FormData();
			 formData.append('def_uid', this.params.def_uid);
			 formData.append('insp_uid', this.params.insp_uid);
			// formData.append('def_uid', 'BC7512E3-19B0-425A-8BE9-0DEA33E88077');
			// formData.append('insp_uid', 'EC6ED7C3-EC61-4B72-A6F9-5F5DBBB67654');
			 let a = vueEx.filess;
			 for (let i = 0; i < a.length; i++){
				formData.append('file_' + i, a[i].fileSelf);
				formData.append('comment_' + i, a[i].comment );
				console.log(a[i].fileSelf);
			 }
			let ajax;
			if ('ActiveXObject' in window) { ajax = new window.ActiveXObject('Msxml2.XMLHTTP') } else if ('Microsoft.XMLHTTP' in window) { ajax = new window.ActiveXObject('Microsoft.XMLHTTP') } else { ajax = new window.XMLHttpRequest() }
			const URL = 'http://localhost/tmou/index.php?action=savevid';
			/*ajax.open('POST', URL, true);
			ajax.onreadystatechange = function () { // Call a function when the state changes.
				if (ajax.readyState == 4 && ajax.status == 200) {
					console.log('sex!');
				};
			}; ajax.send(formData);	*/
			const config = {
				headers: 			{'Accept': 'application/json',
									 'Content-Type': 'application/octet-stream'},
				onUploadProgress: function(progressEvent) {
					vueEx._data.uploadPercentage = Math.round( (progressEvent.loaded*100) / progressEvent.total);
				  }
			  }; 
			 /* formData.set('_method', 'put') 
			  this.$http.put(URL, formData).then((response) => { console.log(response); }) 			  */
		//  axios({ method: "POST", "url": URL, "data":formData, "config":config  }) 
			 axios.post(URL, formData,config)
			.then(function(res) {
				console.log('SUCCESS!!');console.log(res);
				vueEx._data.filess = [] // this.filess = [];
				vueEx._data.transferStatus = `Your Files Uploaded Successively!`;
				that.btnalreadyuploaded = btnTMPname; that.btnsend = btnTMPsendName;
				that.load();
			})
			.catch(function(err){console.log('FAILURE!!'); console.log(err); vueEx._data.transferStatus = `<b>Error => </b> ${err.response}!`})
			.then(() => { that.btnalreadyuploaded = btnTMPname; that.btnsend = btnTMPsendName; });
		}
	},
	computed: {
		params () {
		//console.log(params.def_uid)
		//console.log(params.insp_uid)
		return window.location.search.replace('?','').split('&').reduce(function(p,e){var a = e.split('=');p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]); 
		return p;},{});
		},
		sumVideos () {
			let sumArr = [];
			let fil = 0;
			vueEx.filess.forEach(file => fil +=  file.size); // ES15=> this.filess.forEach(function(file,count){fil +=  file.size;});
			let size0 = (fil / 1000 / 1000).toFixed(1);
			let size1 = size0 > 1000 ? `<b style='color:red'>${size0}</b>` : `<span style='color:green'>${size0}</span>`;
			let size = '<b>Size:</b> '+size1+' Mbytes';
			sumArr.push({length: vueEx.filess.length, size: size});
			return sumArr
		}
	},
	template: tmpInput
})	

var drop = document.querySelector('#file-drag-drop');
function highlight(e) {drop.classList.add('isActive');}
function unhighlight(e) {drop.classList.remove('isActive');}
function prevent(e) {e.preventDefault();e.stopPropagation();}
var highlightEvents = ['dragenter', 'dragover'];
var unhighlightEvents = ['dragleave', 'drop']; 
[...highlightEvents, ...unhighlightEvents].forEach(ev => {
  drop.addEventListener(ev, prevent, false);
}); 
highlightEvents.forEach(ev => {drop.addEventListener(ev, highlight, false);}); 
unhighlightEvents.forEach(ev => {drop.addEventListener(ev, unhighlight, false);});
