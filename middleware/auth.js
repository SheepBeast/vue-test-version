function need_login(req, res, next) {
  if (!req.session.isLogin) {
    if (req.xhr) {
      res.send({
        code: '-1',
        detail: '请先登录'
      })
    } else {
      res.redirect('/users/login')
    }
  } else {
    next()
  }
}

module.exports = {
  need_login: need_login
}