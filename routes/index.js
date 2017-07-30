var express = require('express');
var router = express.Router();
var api = require('../api')
var auth = require('../middleware/auth')

router.get('/', auth.need_login, function (req, res, next) {
  api.ps().then(function (output) {
    var list = output.split(/\n|\r/g),
      containers = []

    list.pop()
    for (var i = 0, ll = list.length; i < ll; i++) {
      var props = list[i].split(/\|/g)
      containers.push({
        "CONTAINER ID": props[0],
        "IMAGE": props[1],
        "COMMAND": props[2].replace(/\[|\]/g, ''),
        "CREATED": new Date(props[3]).toLocaleString(),
        "STATUS": props[4],
        "NAMES": props[5].slice(1)
      })
    }
    res.render('index', {
      title: 'Version Manager',
      containers: containers
    });
  }).catch(function (err) {
    res.render('index', {
      title: 'Version Manager',
      error: err
    });
  })
});

module.exports = router;
