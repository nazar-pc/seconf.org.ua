// Generated by CoffeeScript 1.4.0

/**
 * @package        Content
 * @category       modules
 * @author         Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright      Copyright (c) 2014, Nazar Mokrynskyi
 * @license        MIT License, see license.txt
*/


(function() {

  if (!cs.is_admin) {
    return;
  }

  $(function() {
    var L;
    L = cs.Language;
    $(document).on('click', '.cs-content-add', function() {
      var content, key, modal_body, title, type;
      modal_body = $("<div><div class=\"uk-form\">\n	<p>\n		<label>" + L.content_key + ":</label>\n		<input type=\"text\" name=\"key\">\n	</p>\n	<p>\n		<label>" + L.content_title + ":</label>\n		<input type=\"text\" name=\"title\">\n	</p>\n	<p>\n		<label>" + L.content_content + ":</label>\n		<textarea class=\"text\"></textarea>\n		<textarea class=\"html EDITOR\" id=\"cs-content-html-content\"></textarea>\n	</p>\n	<p>\n		<label>" + L.content_type + ":</label>\n		<select name=\"type\">\n			<option value=\"text\">text</option>\n			<option value=\"html\" id=\"cs-content-html-content\">html</option>\n		</select>\n	</p>\n	<p class=\"cs-right\">\n		<button class=\"uk-button\">Save</button>\n	</p>\n</div></div>");
      key = modal_body.find('[name=key]');
      title = modal_body.find('[name=title]');
      content = modal_body.find('.text');
      modal_body.find('.html').hide();
      type = modal_body.find('[name=type]');
      type.change(function() {
        if (type.val() === 'text') {
          typeof window.editor_deinitialization === 'function' && editor_deinitialization('cs-content-html-content');
          modal_body.find('.html').hide();
          return content = modal_body.find('.text').show().val(content.val());
        } else {
          modal_body.find('.text').hide();
          content = modal_body.find('.html').show().val(content.val());
          return typeof window.editor_reinitialization === 'function' && editor_reinitialization('cs-content-html-content');
        }
      });
      modal_body.appendTo('body').cs().modal('show').on('uk.modal.hide', function() {
        return $(this).remove();
      });
      return modal_body.find('button').click(function() {
        return $.ajax({
          url: 'api/Content',
          data: {
            key: key.val(),
            title: title.val(),
            content: content.val(),
            type: type.val()
          },
          type: 'post',
          success: function() {
            return location.reload();
          }
        });
      });
    }).on('click', '.cs-content-edit', function() {
      var key;
      key = $(this).data('key');
      return $.ajax({
        url: "api/Content/" + key,
        type: 'get',
        success: function(data) {
          var content, modal_body, title, type;
          modal_body = $("<div><div class=\"uk-form\">\n	<p>" + L.content_key + ": " + data.key + "</p>\n	<p>\n		<label>" + L.content_title + ":</label>\n		<input type=\"text\" name=\"title\">\n	</p>\n	<p>\n		<label>" + L.content_content + ":</label>\n		<textarea class=\"text\"></textarea>\n		<textarea class=\"html EDITOR\" id=\"cs-content-html-content\"></textarea>\n	</p>\n	<p>\n		<label>" + L.content_type + ":</label>\n		<select name=\"type\">\n			<option value=\"text\">text</option>\n			<option value=\"html\">html</option>\n		</select>\n	</p>\n	<p class=\"cs-right\">\n		<button class=\"uk-button\">Save</button>\n	</p>\n</div></div>");
          title = modal_body.find('[name=title]').val(data.title);
          content = modal_body.find('textarea').val(data.content);
          modal_body.find("textarea:not(." + data.type + ")").hide();
          type = modal_body.find('[name=type]').val(data.type);
          type.change(function() {
            if (type.val() === 'text') {
              typeof window.editor_deinitialization === 'function' && editor_deinitialization('cs-content-html-content');
              modal_body.find('.html').hide();
              return content = modal_body.find('.text').show().val(content.val());
            } else {
              console.log('');
              modal_body.find('.text').hide();
              content = modal_body.find('.html').show().val(content.val());
              return typeof window.editor_reinitialization === 'function' && editor_reinitialization('cs-content-html-content');
            }
          });
          modal_body.appendTo('body').cs().modal('show').on('uk.modal.hide', function() {
            return $(this).remove();
          });
          return modal_body.find('button').click(function() {
            return $.ajax({
              url: "api/Content/" + key,
              data: {
                title: title.val(),
                content: content.val(),
                type: type.val()
              },
              type: 'put',
              success: function() {
                return location.reload();
              }
            });
          });
        }
      });
    }).on('click', '.cs-content-delete', function() {
      var key;
      if (!confirm("" + L.content_delete + "?")) {
        return;
      }
      key = $(this).data('key');
      return $.ajax({
        url: "api/Content/" + key,
        type: 'delete',
        success: function() {
          return location.reload();
        }
      });
    });
    return (function() {
      var mousemove_timeout, show_edit_button, showed_button;
      mousemove_timeout = 0;
      showed_button = false;
      show_edit_button = function(key, x, y, container) {
        var button;
        button = $("<button class=\"uk-button cs-content-edit\" data-key=\"" + key + "\">" + L.content_edit + "</button>").css('position', 'absolute').offset({
          top: y,
          left: x
        }).appendTo(container);
        return container.mouseleave(function() {
          showed_button = false;
          return button.remove();
        });
      };
      return $(document).on('mousemove', '[data-cs-content]', function(e) {
        var $this;
        if (showed_button) {
          return;
        }
        $this = $(this);
        clearTimeout(mousemove_timeout);
        mousemove_timeout = setTimeout((function() {
          showed_button = true;
          return show_edit_button($this.data('cs-content'), e.pageX, e.pageY, $this);
        }), 200);
      }).on('mouseleave', '[data-cs-content]', function() {
        return clearTimeout(mousemove_timeout);
      });
    })();
  });

}).call(this);
