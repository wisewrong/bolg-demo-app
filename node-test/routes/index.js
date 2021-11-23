var express = require('express');
var router = express.Router();
var sql = require('../public/javascripts/sql');

/* GET home page. */
router.get('/', function(req, res, next) {
  sql.list(res, 'select * from Movies_List', function(result) {
    res.render('index', {
      title: '十八电影',
      activeIndex: '/index',
      movies: result
    });
  });
});

module.exports = router;