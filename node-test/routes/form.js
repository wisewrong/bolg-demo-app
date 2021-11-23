var express = require('express');
var router = express.Router();
var sql = require('../public/javascripts/sql');

router.post('/movies/search', function(req, res, next) {
  var formData = req.body;
  var sqltext = `select * from Movies_List t where t.title like '%${formData.search}%'`;
  sql.list(res, sqltext,function(result){
    res.status(200).json(result)
  });
});

router.post('/comment/add/:id', function(req, res, next) {
  var formData = req.body;
  formData.movieId = req.params.id;
  var sqltext = "INSERT INTO [Content_List]([address],[content],[movieId]) VALUES ('" + formData.address + "','" + formData.content + "','" + formData.movieId + "')";
  sql.add(res, sqltext, function(result) {
    res.status(200).json({
      success: true,
      message: '' 
    })
  });
});

router.post('/comment/praise/:id', function(req, res, next) {
  var formData = req.body;
  formData.id = req.params.id;
  var sqltext = `update Content_List set praise+=1 where id=${formData.id}`;
  sql.add(res, sqltext, function(result) {
    res.status(200).json({
      success: true,
      message: '' 
    })
  });
});

router.post('/comment/delete/:id', function(req, res, next) {
  var formData = req.body;
  formData.id = req.params.id;
  var sqltext1 = `select id from Users where code='admin' and password='${formData.password}'`;
  var sqltext2 = `delete Content_List where id=${formData.id}`;
  sql.list(res, sqltext1,function(checkRes){
    if (checkRes.length > 0) {
      sql.add(res, sqltext2,function(result){
        res.status(200).json({
          success: true,
          message: '' 
        })
      })
    } else {
      res.status(200).json({
        success: false,
        message: '密码错误'
      })
    }
  });
});

module.exports = router;