var express = require('express');
var router = express.Router();
var api = require('../api')
var auth = require('../middleware/auth')
var util = require('../util')

router.get('/', auth.need_login, function (req, res, next) {
  api.ps().then(function (output) {
    res.render('index', {
      process: util.renderProcessRow(req, res, output)
    });
  }).catch(function (err) {
    res.render('index', {
      error: err
    });
  })
});

module.exports = router;
