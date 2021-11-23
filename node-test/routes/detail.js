var express = require('express');
var router = express.Router();
var sql = require('../public/javascripts/sql');

/* GET detail page. */
router.get('/:id', function(req, res, next) {
  var sqlText = 'select * from Movies_List where id = '+req.params.id+';select * from Movie_Links where movieId = '+req.params.id;
  sql.detail(res, sqlText, function(result) {
    var data = result[0][0];
    data.links = result[1];
    res.render('detail', {
      title: '影片详情',
      activeIndex: '/detail',
      movie: data
    });
  });
});

module.exports = router;
