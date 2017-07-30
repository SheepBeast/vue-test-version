var express = require('express');
var router = express.Router();

// var md5 = require('md5');
var user = require('../config/user.json');

router.get('/login', function(req, res, next){
  res.render('login')
})

router.post('/login', function(req, res){
  var b = req.body
  if(!b.username || !b.password){
    res.render('login', {
      err: '请填写用户名或密码'
    })
    return false
  }
  if(!(b.username in user)){
    res.render('login', {
      err: '该用户不存在'
    })
    return false
  }
  if(user[b.username] !== b.password){
    res.render('login', {
      err: '用户名或密码错误'
    })
    return false
  }
  req.session.isLogin = true
  res.redirect('/')
})

module.exports = router;
