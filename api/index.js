var child_process = require('child_process')
var async = require('async')

// 一个api对应一个业务

// 查看所有进程
function ps() {
  return new Promise(function (resolve, reject) {
    child_process.exec('docker inspect --format="{{.Config.Hostname}}|{{.Config.Image}}|{{.Config.Cmd}}|{{.Created}}|{{.State.Status}}|{{.Name}}" `docker ps -a -q`', function (err, stdout, stderr) {
      stdout ? resolve(stdout) : reject(err || stderr)
    })
  })
}

function inspect(options) {
  return new Promise(function (resolve, reject) {
    child_process.exec(`docker inspect ${options.container}`, function (err, stdout, stderr) {
      stdout ? resolve(stdout) : reject(err || stderr)
    })
  })
}

// 启动
function start(options) {
  return new Promise(function (resolve, reject) {
    child_process.exec(`docker start ${options.container}`, function (err, stdout, stderr) {
      stdout ? resolve(stdout) : reject(err || stderr)
    })
  })
}

// 停止
function stop(options) {
  return new Promise(function (resolve, reject) {
    child_process.exec(`docker stop ${options.container}`, function (err, stdout, stderr) {
      stdout ? resolve(stdout) : reject(err || stderr)
    })
  })
}

// 重启
function restart(options) {
  return new Promise(function (resolve, reject) {
    child_process.exec(`docker restart ${options.container}`, function (err, stdout, stderr) {
      stdout ? resolve(stdout) : reject(err || stderr)
    })
  })
}

// 构建
function build(options) {
  return new Promise(function (resolve, reject) {
    child_process.exec(`docker build -t ${options.tag} ${options.path}`, function (err, stdout, stderr) {
      stdout ? resolve(stdout) : reject(err || stderr)
    })
  })
}

// 升级
function upgrade(options) {
  return new Promise(function (resolve, reject) {
    async.waterfall([
      function (done) {
        child_process.exec(`docker rename ${options.container} ${options.name}`, function (err, stdout, stderr) {
          done(err || stderr, stdout)
        })
      },
      function (rename, done) {
        var command = ['docker', 'run']
        options.name && command.push('--name', $options.name)
        options.link && command.push('--link', options.link)
        options.port && command.push('-p', options.port)
        options.volume && command.push('-v', options.volume)
        command.push(options.image)

        child_process.exec(command.join(' '), function (err, stdout, stderr) {
          done(err || stderr, stdout)
        })
      }
    ], function (err, result) {
      result ? resolve(result) : reject(err)
    })
  })
}

module.exports = {
  ps: ps,
  inspect: inspect,
  start: start,
  stop: stop,
  restart: restart,
  build: build,
  upgrade: upgrade
}