var express = require('express');
var router = express.Router();
var async = require('async');
var api = require('../api');
var auth = require('../middleware/auth');
var xhr = require('../middleware/xhr');
var util = require('../util');

router.get('/', auth.need_login, function (req, res, next) {
  var q = req.query
  async.waterfall([
    function (done) {
      api[q.handle](q).then(function (output) {
        done(null, output)
      }).catch(function (err) {
        done(err)
      })
    },
    function (handle, done) {
      api.ps(q).then(function (output) {
        done(null, output)
      }).catch(function (err) {
        done(err)
      })
    }
  ], function (err, result) {
    if (!err) {
      res.send({
        code: '0',
        html: util.renderProcessRow(req, res, result)
      })
    } else {
      res.send({
        code: '-3',
        error: err
      })
    }
  })
});

module.exports = router;
