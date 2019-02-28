require('babel-polyfill')

function getData () {
  return new Promise(function (resolve, reject) {
      setTimeout(function () { 
          resolve('Async');
        }, 2000);
    });
} 
async function getDataAsync(){
    let data = await getData();
    console.log(data);
}
getDataAsync(); 