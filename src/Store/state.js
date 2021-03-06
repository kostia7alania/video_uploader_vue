//: 'http://localhost:3000/backend',//'./backend/';// 'https://apcis.tmou.org/APCIS-Test/index.php',

const state = {
  IS_CONFIG_GETTED: false,
  BASE_URL: null,
  watch_url: null,
  gif_url: null,
  webp_url: null,
  img_url: null,
  show_menu: false,
  upload_action: "savevid",
  video_brand_img_title: " ", //"by VUE.js Dev Team",
  video_brand_click_msg: "Brand click", //Значение из перевода
  video_brand_img_src: "",
  /**** LIMITS 4 upload ****/
  formats: "mp4,avi,flv,3gp,mpg,mov,qt,wmv,mkv",

  maxSize: 2000, // 2gb.
  maxDuration: 10, //в минутах 5min - длительность видео.

  commentMaxLength: "2000",
  /*SELECT VIDEOs*/
  selectedVideos: [],
  SelectedFiles__IsLoading: false,
  selectedActiveContextRowHash: null,
  /*DEPRECATED=>"дороговато": возобновляю;)*/
  selectedVideos_Sort: "", // see => SelectedFilesHeadInfo.vue
  selectedVideos_SortType: 0, // <<<<<0 - desc<<<< ====== >>>>1 - asc>>>>

  getTime: () => {
    let d = new Date();
    let sec = d.getSeconds();
    sec = sec < 10 ? "0" + sec : sec;
    let min = d.getMinutes();
    min = min < 10 ? "0" + min : min;
    return `${d.getHours()}:${min}:${sec}`;
  },
  /* already uploaded */
  alreadyUploaded: [], //[{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:54","Status":"0","VidUID":"DE84A7C5-4822-4E29-3897-03CCFE4AF1E9"},{"Comments":"test","OrigFileName":"F0533B1B-19C4-67B0-E868-09CA9F5C0641.mp4","Hash":"55","Date":"05.03.2019 12:44","Status":"3","VidUID":"F0533B1B-19C4-67B0-E868-09CA9F5C0641"},{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:49","Status":"0","VidUID":"562D4996-A618-56DE-17B2-0F77128CF63C"},{"Comments":"sadsa","OrigFileName":"20180715_193854.mp4","Hash":"231c272880383837fce0c40551653d2c0365b9df","Date":"05.03.2019 15:21","Status":"0","VidUID":"BEF27D14-58AE-C671-7B7C-14DF6A585FA7"},{"Comments":"test","OrigFileName":"FCA47036-C82B-4359-41BC-1B6A7DE2EE7F.mp4","Date":"05.03.2019 12:35","Status":"3","VidUID":"FCA47036-C82B-4359-41BC-1B6A7DE2EE7F"},{"Comments":"","OrigFileName":"FE7EF896-3816-942D-7DBE-1BF32F228F12.mp4","Date":"05.03.2019 13:16","Status":"3","VidUID":"FE7EF896-3816-942D-7DBE-1BF32F228F12"},{"Comments":"test","OrigFileName":"66B86778-63B6-E790-3ABE-2056A62F1769.mp4","Date":"05.03.2019 12:35","Status":"3","VidUID":"66B86778-63B6-E790-3ABE-2056A62F1769"},{"Comments":"","OrigFileName":"B88129A3-8E5B-5C74-86EE-21935CCF833E.mp4","Date":"05.03.2019 13:19","Status":"3","VidUID":"B88129A3-8E5B-5C74-86EE-21935CCF833E"},{"Comments":"","OrigFileName":"29090688-8847-6DFF-5F15-23F8CF8821C8.mp4","Date":"05.03.2019 13:19","Status":"3","VidUID":"29090688-8847-6DFF-5F15-23F8CF8821C8"},{"Comments":"","OrigFileName":"BD612994-896E-019C-92A3-2ABB7333A9BB.3gp","Date":"05.03.2019 12:33","Status":"3","VidUID":"BD612994-896E-019C-92A3-2ABB7333A9BB"},{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:51","Status":"0","VidUID":"A37C447E-8A8F-55B3-C8A7-32E5A35F9171"},{"Comments":"","OrigFileName":"0A0FB31F-2BCB-3B36-E3C8-381AEC55129F.mp4","Date":"05.03.2019 13:16","Status":"3","VidUID":"0A0FB31F-2BCB-3B36-E3C8-381AEC55129F"},{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:54","Status":"0","VidUID":"9190AB4E-9199-A715-F0CB-3A1B60CE53CF"},{"Comments":"test","OrigFileName":"5FD5F67C-A984-C6A1-406A-3C1A05CDE1BB.mp4","Date":"05.03.2019 12:37","Status":"3","VidUID":"5FD5F67C-A984-C6A1-406A-3C1A05CDE1BB"},{"Comments":"test","OrigFileName":"71550951-CB81-440A-CD86-3CA935B303AA.mp4","Date":"05.03.2019 12:38","Status":"3","VidUID":"71550951-CB81-440A-CD86-3CA935B303AA"},{"Comments":"","OrigFileName":"84FFA419-34B6-8636-E110-3EE647D32D06.mp4","Date":"05.03.2019 12:48","Status":"3","VidUID":"84FFA419-34B6-8636-E110-3EE647D32D06"},{"Comments":"","OrigFileName":"EFCB67AE-5672-D91A-18EE-4243DDA9BEC2.mp4","Date":"05.03.2019 13:19","Status":"3","VidUID":"EFCB67AE-5672-D91A-18EE-4243DDA9BEC2"},{"Comments":"","OrigFileName":"4DE83C3E-0990-CE0F-84FD-4253B7B6F92D.mp4","Date":"05.03.2019 13:19","Status":"3","VidUID":"4DE83C3E-0990-CE0F-84FD-4253B7B6F92D"},{"Comments":"test","OrigFileName":"A1FE3243-D557-BB4A-5AEB-4759C4F787D7.mp4","Date":"05.03.2019 12:38","Status":"3","VidUID":"A1FE3243-D557-BB4A-5AEB-4759C4F787D7"},{"Comments":"test","OrigFileName":"3D5B701D-ED9C-F0ED-DDB9-4D142E588556.mp4","Date":"05.03.2019 12:40","Status":"3","VidUID":"3D5B701D-ED9C-F0ED-DDB9-4D142E588556"},{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:52","Status":"0","VidUID":"B0674D8E-E2F4-3B08-51DA-4EC11368F7B0"},{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:49","Status":"0","VidUID":"9AA18336-A1C7-555E-75DA-4F1B3E58DD9B"},{"Comments":"test","OrigFileName":"4871A630-DA58-CB51-97B5-53A8E01672E6.mp4","Date":"05.03.2019 12:39","Status":"3","VidUID":"4871A630-DA58-CB51-97B5-53A8E01672E6"},{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:53","Status":"0","VidUID":"F2343534-1CF6-4CCC-CA6C-53B875231F8F"},{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:45","Status":"0","VidUID":"D1C5CA44-F0D5-DFB7-052D-5D962F319659"},{"Comments":"","OrigFileName":"121B1D55-5AC4-EF2D-1AFC-6713EFFA7502.mp4","Date":"05.03.2019 12:27","Status":"3","VidUID":"121B1D55-5AC4-EF2D-1AFC-6713EFFA7502"},{"Comments":"test","OrigFileName":"B09B6E43-FECD-F58C-0FF7-700BABF4B46A.mp4","Date":"05.03.2019 12:39","Status":"3","VidUID":"B09B6E43-FECD-F58C-0FF7-700BABF4B46A"},{"Comments":"-","OrigFileName":"9A66F24C-AB09-47FA-8425-7703C7B39D40.mp4","Date":"28.02.2019 20:49","Status":"3","VidUID":"9A66F24C-AB09-47FA-8425-7703C7B39D40"},{"Comments":"","OrigFileName":"F8E4DD52-1AB6-E501-9A2F-7942C872EE47.mp4","Date":"05.03.2019 12:33","Status":"3","VidUID":"F8E4DD52-1AB6-E501-9A2F-7942C872EE47"},{"Comments":"","OrigFileName":"20180715_200045.mp4","Hash":"43d1e117dbd73189d95f6986a486a37947eedcac","Date":"05.03.2019 18:01","Status":"0","VidUID":"DDE98722-1556-42F4-DBE6-88123A2BA516"},{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:49","Status":"0","VidUID":"5ED2F2A1-3EE4-6DB9-BBA3-8C65F67FA12A"},{"Comments":"test","OrigFileName":"95E04185-1BC7-E083-6FB3-8D04D5667DC1.mp4","Date":"05.03.2019 12:38","Status":"3","VidUID":"95E04185-1BC7-E083-6FB3-8D04D5667DC1"},{"Comments":"test","OrigFileName":"2811DA40-4F4F-CC9C-0C3F-9A37140B53C7.mp4","Date":"05.03.2019 12:34","Status":"3","VidUID":"2811DA40-4F4F-CC9C-0C3F-9A37140B53C7"},{"Comments":"test","OrigFileName":"DF712100-ECDF-3A3F-86FF-9ADCA97B7631.mp4","Date":"05.03.2019 12:38","Status":"3","VidUID":"DF712100-ECDF-3A3F-86FF-9ADCA97B7631"},{"Comments":"test","OrigFileName":"4623B457-5C26-B4E8-1C45-9C6CC70A493F.mp4","Date":"05.03.2019 12:34","Status":"3","VidUID":"4623B457-5C26-B4E8-1C45-9C6CC70A493F"},{"Comments":"34407c22bccd0c36035da7b00a2872b8daa7e820","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"555","Date":"05.03.2019 14:38","Status":"0","VidUID":"AE316575-1CE8-A312-D6F1-9C8D4DD866C6"},{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:49","Status":"0","VidUID":"C00C44EF-FFC3-CDC0-917F-A92831DA0D7A"},{"Comments":"","OrigFileName":"7B94765E-769C-B80E-3D01-AA9CCB22CB4F.mp4","Date":"05.03.2019 12:46","Status":"3","VidUID":"7B94765E-769C-B80E-3D01-AA9CCB22CB4F"},{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:48","Status":"0","VidUID":"67159167-C6A5-FDE0-A7B7-AB06266033D2"},{"Comments":"","OrigFileName":"61C972E5-C906-5FE3-EC7A-AC9F55087671.mov","Date":"05.03.2019 12:23","Status":"3","VidUID":"61C972E5-C906-5FE3-EC7A-AC9F55087671"},{"Comments":"test","OrigFileName":"53E34C35-F221-FC81-382A-ACDC44D0EE61.mp4","Date":"05.03.2019 12:39","Status":"3","VidUID":"53E34C35-F221-FC81-382A-ACDC44D0EE61"},{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:39","Status":"0","VidUID":"2A87E8BA-47DC-B67B-5BFB-BAF94B8C9E46"},{"Comments":"34407c22bccd0c36035da7b00a2872b8daa7e820","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"","Date":"05.03.2019 14:29","Status":"0","VidUID":"2B1E828E-4A63-214F-D61F-C9E1017C61D8"},{"Comments":"test","OrigFileName":"1C8B8EA9-4AE7-894B-A3EF-CD5403815D20.mp4","Date":"05.03.2019 12:37","Status":"3","VidUID":"1C8B8EA9-4AE7-894B-A3EF-CD5403815D20"},{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:53","Status":"0","VidUID":"9948591E-330E-362C-9835-E4B57468E4D9"},{"Comments":"","OrigFileName":"6162A9B0-3ADE-312F-6C6D-EA8143D318C4.mp4","Date":"05.03.2019 13:17","Status":"3","VidUID":"6162A9B0-3ADE-312F-6C6D-EA8143D318C4"},{"Comments":"commentsss","OrigFileName":"VID_50110911_225334_230.mp4","Hash":"34407c22bccd0c36035da7b00a2872b8daa7e820","Date":"05.03.2019 14:46","Status":"0","VidUID":"E0F966D0-76F3-4FD4-3BA9-EAF0E7C3A079"},{"Comments":"test","OrigFileName":"20180715_200045.mp4","Hash":"43d1e117dbd73189d95f6986a486a37947eedcac","Date":"05.03.2019 18:04","Status":"0","VidUID":"39AF7BB6-E485-BECD-FDD0-F3AF7D4D3C65"}],
  percentCompleted: null,

  /* sort */
  uploadedListSort: "Date", // see => SelectedFilesHeadInfo.vue
  uploadedListSortType: 0, // <<<<<0 - desc<<<< ====== >>>>1 - asc>>>>

  uploadAllInProgress: false, //true when click UPLOAD ALL btn
  isLoadedList: false,
  source: null, //USAGE => source.cancel('reason');
  lastUpdatedAlsoLoaded: false,
  modalActiveIndex: false,
  alreadyUploaded_btn_status: 0, //

  /* MISC */
  height: window.innerHeight,

  status: "online"
};
export default state;
