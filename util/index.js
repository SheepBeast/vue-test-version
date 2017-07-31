var ejs = require('ejs')
var fs = require('fs')

function renderProcessRow(req, res, output) {
  if (!output || typeof output !== 'string') return ''
  var list = output.split(/\n|\r/g),
    containers = []
  list.pop()
  for (var i = 0, ll = list.length; i < ll; i++) {
    if(!list[i]) continue;
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

  var str = fs.readFileSync(req.app.get('views') + '/process.ejs', 'utf8')
  var html = ejs.render(str, {
    containers: containers
  })
  return html
}

module.exports = {
  renderProcessRow: renderProcessRow
}
