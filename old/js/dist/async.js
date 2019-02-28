'use strict';

require('babel-polyfill');

function getData() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('Async');
        }, 2000);
    });
}
async function getDataAsync() {
    var data = await getData();
    console.log(data);
}
getDataAsync();