(function ($) {
  
      window.Wsmsg = function () {
          var html = '<div id="[Id]" class="ws-modal modal fade" role="dialog" aria-labelledby="modalLabel">' +
                        '<div style="height: 20%;"></div>' +
                        '<div class="modal-dialog modal-sm">' +
                            '<div class="modal-content">' +
                                '<div class="modal-header">' +
                                    '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                                    '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                  '<p>[Message]</p>' +
                                  '<div class="form-group ws-prompt" style="margin: 10px 0 0 0;">' +
                                    '<input type="password" class="form-control">' +
                                  '</div>' +
                                '</div>' +
                                '<div class="modal-footer">' +
                                  '<button type="button" class="btn btn-default ws-cancel" data-dismiss="modal">[BtnCancel]</button>' +
                                  '<button type="button" class="btn btn-primary ws-ok" data-dismiss="modal">[BtnOk]</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
          var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
          var generateId = function () {
              var date = new Date();
              return 'mdl' + date.valueOf();
          }
          var init = function (options) {
              options = $.extend({}, {
                  title: "提示",
                  message: "提示内容",
                  btnok: "确定",
                  btncl: "取消",
                  width: 200,
                  auto: false
              }, options || {});
              var modalId = generateId();
              var content = html.replace(reg, function (node, key) {
                  return {
                      Id: modalId,
                      Title: options.title,
                      Message: options.message,
                      BtnOk: options.btnok,
                      BtnCancel: options.btncl
                  }[key];
              });
              $('body').append(content);
              $('#' + modalId).modal({
                  width: options.width,
                  backdrop: 'static'
              });
              $('#' + modalId).on('hide.bs.modal', function (e) {
                  $('body').find('#' + modalId).remove();
              });
              return modalId;
          }
  
          return {
            alert: function (options) {
                if (typeof options == 'string') {
                  options = {
                      message: options
                  };
                }
                var id = init(options);
                var modal = $('#' + id);
                // modal.find('.ws-ok').removeClass('btn-success').addClass('btn-primary');
                modal.find('.ws-prompt').hide();
                modal.find('.ws-cancel').hide();

                return {
                  id: id,
                  on: function (callback) {
                    if (callback && callback instanceof Function) {
                      modal.find('.ws-ok').click(function () { callback(true); });
                    }
                  },
                  hide: function (callback) {
                    if (callback && callback instanceof Function) {
                      modal.on('hide.bs.modal', function (e) {
                        callback(e);
                      });
                    }
                  }
                };
            },
            confirm: function (options) {
              if (typeof options == 'string') {
                options = {
                    message: options
                };
              }
              var id = init(options);
              var modal = $('#' + id);
              // modal.find('.ws-ok').removeClass('btn-primary').addClass('btn-success');
              modal.find('.ws-prompt').hide();
              modal.find('.ws-cancel').show();
              return {
                id: id,
                on: function (callback) {
                  if (callback && callback instanceof Function) {
                    modal.find('.ws-ok').click(function () { callback(true); });
                    modal.find('.ws-cancel').click(function () { callback(false); });
                  }
                },
                hide: function (callback) {
                  if (callback && callback instanceof Function) {
                    modal.on('hide.bs.modal', function (e) {
                      callback(e);
                    });
                  }
                }
              };
            },
            prompt: function (options) {
              if (typeof options == 'string') {
                options = {
                    message: options
                };
              }
              var id = init(options);
              var modal = $('#' + id);
              // modal.find('.ws-ok').removeClass('btn-primary').addClass('btn-success');
              modal.find('.ws-prompt').show();
              modal.find('.ws-cancel').show();
              
              return {
                id: id,
                on: function (callback) {
                  if (callback && callback instanceof Function) {
                    modal.find('.ws-ok').click(function () { 
                      var val = modal.find('.ws-prompt').children('input').val().trim();
                      callback(val);
                     });
                    modal.find('.ws-cancel').click(function () { callback(false); });
                    modal.find('.ws-prompt input').keydown(function (event) {
                      if(event.keyCode ==13) {
                        $('.ws-ok').trigger('click');
                        $(this).blur();
                        return false;
                      }
                    })
                  }
                },
                hide: function (callback) {
                  if (callback && callback instanceof Function) {
                    modal.on('hide.bs.modal', function (e) {
                      callback(e);
                    });
                  }
                }
              }
            }
          }
      }();
  })(jQuery);