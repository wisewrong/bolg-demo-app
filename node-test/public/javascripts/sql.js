var mssql = require('mssql');

var config = {
  user: 'sa',
  password: 'sa123456',
  server: 'localhost',
  database: 'wise'
};

var sql = {};
function wiseSql(sqltext, res) {
  mssql.close();
  return new Promise(function (resolve, reject) {
    mssql.connect(config).then(function () {
      // Query
      new mssql.Request()
        .query(sqltext).then(function (result) {
          resolve(result)
          mssql.close();
        }).catch(function (err) {
          reject(err)
          res.render('error');
          console.log('出错了 ', err);
          mssql.close();
        })
    })
  })
}

sql.list = function (res, sqltext, callback) {
  wiseSql(sqltext, res).then(result => {
    callback(result.recordset);
  })
}

sql.detail = function (res, sqltext, callback) {
  wiseSql(sqltext, res).then(result => {
    callback(result.recordsets)
  })
}

sql.add = function (res, sqltext, callback) {
  wiseSql(sqltext, res).then(result => {
    callback(result.recordset)
  })
}

// 防刷
sql.check = function (req) {
  console.log(req)
}

module.exports = sql;
