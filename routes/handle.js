var express = require('express');
var router = express.Router();
var api = require('../api')
var auth = require('../middleware/auth')

router.get('/', auth.need_login, function (req, res, next) {
  if(!req.xhr){
    res.send({
      code: '-4',
      detail: '请使用界面进行操作'
    })
    return false
  }
  var q = req.query
  if(!q.action || !q.container){
    res.send({
      code: '-2',
      detail: '参数不全'
    })
    return false
  }
  api[q.action](q).then(function(output){
    res.send({
      code: '0',
      detail: '操作成功',
      data: output
    })
  }).catch(function(err){
    res.send({
      code: '-3',
      detail: '操作失败',
      error: err
    })
  })
});

module.exports = router;
