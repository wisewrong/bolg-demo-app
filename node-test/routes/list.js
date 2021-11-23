var express = require('express');
var router = express.Router();
var sql = require('../public/javascripts/sql');

/* GET list page. */
router.get('/', function(req, res, next) {
  var sqltext = 'select b.title,a.* from Content_List a inner join Movies_List b on a.movieId=b.id order by praise desc, time asc';
  sql.list(res, sqltext, function(result) {
    res.render('list', {
      title: '评论列表',
      activeIndex: '/list',
      list: result
    });
  })
});

module.exports = router;