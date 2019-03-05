const state = {
  url_api: 'http://localhost:3000/backend', // 'https://apcis.tmou.org/APCIS-Test/index.php',
  formats: "mp4,avi,flv,3gp,mpg,mov,qt,wmv",
  transferStatus: '', 
  alreadyUploaded: [],
  ConvertedVideoDir: "../videos/converted/",
  RealVideoDir: "../videos/real/",
  PreviewDir: "../videos/gif/",
  selectedVideos: [],
  maxSize: +'2 000 000 000'.split(' ').join(''), //2gb.
  getTime: () => { let d = new Date; let sec = d.getSeconds(); sec = sec<10?'0'+sec:sec; let min = d.getMinutes(); min = min<10?'0'+min:min; return `${d.getHours()}:${min}:${sec}`; },
}
export default state;