function Wise(temp) {
  this.temp = temp;
}
Wise.prototype.onload = function() {
  // 注册导航搜索方法
  $('#globalSearch').on('click', 'button', function() {
    var val = $(this).closest('.input-group').children('input[name="search"]').val().trim();
    if (val) {
      var formData = {
        search: val
      }
      $.post('/form/movies/search', formData, function(res) {
        var box = $('#searchBox .list-group');
        box.empty();
        if (res.length) {
          res.forEach(function(item) {
            box.append('<a href="/detail/'+ item.id +'" class="list-group-item"><div class="media"><div class="media-left"><img class="media-object" src="/images/'+item.poster+'" alt="'+item.title+'"></div><div class="media-body"><h4 class="media-heading"><b>'+item.title+'</b><span class="label label-empty">'+item.year+'</span></h4><p class="media-content"></p></div></div></a>')
            $('#searchBox').modal('show');
          });
        } else {
          Wsmsg.alert('没有找到包含“'+val+'”的电影');
        }
      })
    } else {
      Wsmsg.alert('请输入搜索内容');
    }
    $(this).blur();
  });
  $('#globalSearch').on('keydown', 'input', function(event) {
    if(event.keyCode ==13) {
      $('#globalSearch button').trigger('click');
      $(this).blur();
      return false;
    }
  });
}

Wise.prototype.add = function(id, data, callback) {
  $.post(this.temp + id, data, function(res) {
    callback(res)
  });
}
Wise.prototype.delete = function(id, data, callback) {
  $.post(this.temp + id, data, function(res) {
    callback(res)
  });
}
Wise.prototype.select = function(id, data, callback) {
  $.post(this.temp + id, data, function(res) {
    callback(res)
  });
}
Wise.prototype.update = function(id, data, callback) {
  $.post(this.temp + id, data, function(res) {
    callback(res)
  });
}

var base = new Wise();
base.onload();

var wComment = new Wise('/form/comment/');
wComment.submitComment = function(id) {
  var comment = $('textarea[name="comment"]').val();
  if (comment) {
    if (comment.indexOf('王腾') > 0) {
      window.location.href='http://www.cnblogs.com/wisewrong/';
    } else {
      wComment.add('add/'+id, {
        content: comment,
        address: lo
      }, function(result){
        if (result.success) {
          $('textarea[name="comment"]').val('');
          Wsmsg.alert('评论成功');
        } else {
          Wsmsg.alert(result.message);
        }
      });
    }
  } else {
    Wsmsg.alert('请输入评论的内容');
  }
}
wComment.praiseComment = function(val, id) {
  wComment.update('praise/'+id, {}, function(result) {
    if (result.success) {
      Wsmsg.alert('点赞成功').hide(function() {
        window.location.reload();
      })
    } else {
      Wsmsg.alert(result.message);
    }
  });
  $(val).blur();
}
wComment.deleteComment = function(val, id) {
  Wsmsg.prompt('请输入管理员密码').on(function(pw) {
    if (pw) {
      var t = pw;
      wComment.delete('delete/'+id, {
        password: t
      }, function(result){
        if (result.success) {
          Wsmsg.alert('删除成功').hide(function() {
            window.location.reload();
          })
        } else {
          Wsmsg.alert(result.message);
        }
      });
    } else if(pw ===  false) {
      return false
    } else {
      Wsmsg.alert('密码不能为空');
    }
  });
  $(val).blur();
}
