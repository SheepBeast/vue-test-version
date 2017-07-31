function isXHR(req, res, next) {
  if(!req.xhr){
    res.send({
      code: '-4',
      detail: '请使用界面进行操作'
    })
    return false
  }
  next()
}

module.exports = {
  isXHR: isXHR
}