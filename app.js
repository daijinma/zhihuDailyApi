'use strict'
var express = require('express');
var utils = require('./utils.js');
var app = express();
var http = require('http');


//解决NodeJS+Express模块的跨域访问控制问题：Access-Control-Allow-Origin - 推酷  http://www.tuicool.com/articles/vYBR3y
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.contentType('json');
    next();
});




app.get('/news/latest', function (req, res, next) {
  ajax({
    url:'http://news-at.zhihu.com/api/4/news/latest'
  },function(result){
    res.write(result);
    res.end();
  });
  
});

app.get('/news/:id', function (req, res, next) {
  var url = 'http://news-at.zhihu.com/api/4/news/'+req.params.id;
  ajax({
    url:url
  },function(result){
    res.write(result);
    res.end();
  });
});

//图片请求
app.get('/img', function (req, res, next) {
  var url = req.query.url, opt = require("url").parse(url)
  opt.headers = {
    // 'Host':'www.zhihu.com',
    'Origin':'https://www.zhihu.com',
    'Referer':'https://www.zhihu.com/',
  }
  ajaxImg(opt,function(result){
    res.contentType('image/jpg');
    res.write(result);
    res.end();
  });
});



var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


function ajax(option,call){
  http.get(option.url, function(res) {
    var datas = [];  
    var size = 0;  
    res.on('data', function (data) {  
        datas.push(data);  
        size += data.length;  
    //process.stdout.write(data);  
    });  
    res.on("end", function () {  
        var buff = Buffer.concat(datas, size);  
        var result = buff.toString();//不需要转编码,直接tostring  
        call(result);
    });  
  }).on('error', function(e) {
    call(e.message);   
  });
}

function ajaxImg(option,call){
  http.request(option, function(res) {
    var datas = [];  
    var size = 0;  
    res.on('data', function (data) {  
        datas.push(data);  
        size += data.length;  
    //process.stdout.write(data);  
    });  
    res.on("end", function () {  
        var buff = Buffer.concat(datas, size);  
        call(buff);
    });  
  }).on('error', function(e) {
    call(e.message);
  }).end()
}

