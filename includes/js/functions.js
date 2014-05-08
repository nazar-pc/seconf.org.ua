// Generated by CoffeeScript 1.4.0

/**
 * @package		CleverStyle CMS
 * @author		Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright	Copyright (c) 2011-2014, Nazar Mokrynskyi
 * @license		MIT License, see license.txt
*/


(function() {
  var L, value_by_name,
    __hasProp = {}.hasOwnProperty;

  L = cs.Language;

  /**
   * Get value by name
   *
   * @param {string}	name
   *
   * @return {string}
  */


  value_by_name = function(name) {
    return document.getElementsByName(name).item(0).value;
  };

  /**
   * Adds method for symbol replacing at specified position
   *
   * @param {int}		index
   * @param {string}	symbol
   *
   * @return {string}
  */


  String.prototype.replaceAt = function(index, symbol) {
    return this.substr(0, index) + symbol + this.substr(index + symbol.length);
  };

  /**
   * Debug window opening
  */


  cs.debug_window = function() {
    return $('#cs-debug').cs().modal('show');
  };

  /**
   * Cache cleaning
   *
   * @param 			element
   * @param {string}	action
  */


  cs.admin_cache = function(element, action) {
    $(element).html("<div class=\"uk-progress uk-progress-striped uk-active\">\n	<div class=\"uk-progress-bar\" style=\"width:100%\"></div>\n</div>");
    $.ajax({
      url: action,
      success: function(result) {
        return $(element).html(result);
      }
    });
  };

  /**
   * Send request for db connection testing
   *
   * @param {string}	url
   * @param {bool}	added
  */


  cs.db_test = function(url, added) {
    var db, db_test;
    db_test = $('#cs-db-test');
    db_test.find('h3 + *').replaceWith("<div class=\"uk-progress uk-progress-striped uk-active\">\n	<div class=\"uk-progress-bar\" style=\"width:100%\"></div>\n</div>");
    db_test.cs().modal('show');
    if (added) {
      return $.ajax({
        url: url,
        success: function(result) {
          return db_test.find('h3 + *').replaceWith(result);
        },
        error: function() {
          return db_test.find('h3 + *').replaceWith('<p class="cs-test-result">' + L.failed + '</p>');
        }
      });
    } else {
      db = cs.json_encode({
        type: value_by_name('db[type]'),
        name: value_by_name('db[name]'),
        user: value_by_name('db[user]'),
        password: value_by_name('db[password]'),
        host: value_by_name('db[host]'),
        charset: value_by_name('db[charset]')
      });
      return $.ajax({
        url: url,
        data: {
          db: db
        },
        success: function(result) {
          return db_test.find('h3 + *').replaceWith(result);
        },
        error: function() {
          return db_test.find('h3 + *').replaceWith('<p class="cs-test-result">' + L.failed + '</p>');
        }
      });
    }
  };

  /**
   * Send request for storage connection testing
   *
   * @param {string}	url
   * @param {bool}	added
  */


  cs.storage_test = function(url, added) {
    var storage, storage_test;
    storage_test = $('#cs-storage-test');
    storage_test.find('h3 + *').replaceWith("<div class=\"uk-progress uk-progress-striped uk-active\">\n	<div class=\"uk-progress-bar\" style=\"width:100%\"></div>\n</div>");
    storage_test.cs().modal('show');
    if (added) {
      return $.ajax({
        url: url,
        success: function(result) {
          return storage_test.find('h3 + *').replaceWith(result);
        },
        error: function() {
          return storage_test.find('h3 + *').replaceWith('<p class="cs-test-result">' + L.failed + '</p>');
        }
      });
    } else {
      storage = cs.json_encode({
        url: value_by_name('storage[url]'),
        host: value_by_name('storage[host]'),
        connection: value_by_name('storage[connection]'),
        user: value_by_name('storage[user]'),
        password: value_by_name('storage[password]')
      });
      return $.ajax({
        url: url,
        data: {
          storage: storage
        },
        success: function(result) {
          return storage_test.find('h3 + *').replaceWith(result);
        },
        error: function() {
          return storage_test.find('h3 + *').replaceWith('<p class="cs-test-result">' + L.failed + '</p>');
        }
      });
    }
  };

  /**
   * Toggling of blocks group in admin page
   *
   * @param {string}	position
  */


  cs.blocks_toggle = function(position) {
    var container, items;
    container = $("#cs-" + position + "-blocks-items");
    items = container.children('li:not(:first)');
    if (container.data('mode') === 'open') {
      items.slideUp('fast');
      container.data('mode', 'close');
    } else {
      items.slideDown('fast');
      container.data('mode', 'open');
    }
  };

  /**
   * Returns the JSON representation of a value
   *
   * @param {object} obj
   *
   * @return {string}
  */


  cs.json_encode = function(obj) {
    return JSON.stringify(obj);
  };

  /**
   * Decodes a JSON string
   *
   * @param {string}	str
   * @return {object}
  */


  cs.json_decode = function(str) {
    return JSON.parse(str);
  };

  /**
   * Supports algorithms sha1, sha224, sha256, sha384, sha512
   *
   * @param {string} algo Chosen algorithm
   * @param {string} data String to be hashed
   * @return {string}
  */


  cs.hash = function(algo, data) {
    algo = (function() {
      switch (algo) {
        case 'sha1':
          return 'SHA-1';
        case 'sha224':
          return 'SHA-224';
        case 'sha256':
          return 'SHA-256';
        case 'sha384':
          return 'SHA-384';
        case 'sha512':
          return 'SHA-512';
        default:
          return algo;
      }
    })();
    return (new jsSHA(data, 'ASCII')).getHash(algo, 'HEX');
  };

  /**
   * Function for setting cookies taking into account cookies prefix
   *
   * @param {string}	name
   * @param {string}	value
   * @param {int}		expires
   *
   * @return {bool}
  */


  cs.setcookie = function(name, value, expires) {
    var date;
    name = cs.cookie_prefix + name;
    if (!value) {
      return $.removeCookie(name);
    }
    if (expires) {
      date = new Date();
      date.setTime(expires * 1000);
      expires = date;
    }
    return !!$.cookie(name, value, {
      path: cs.cookie_path,
      domain: cs.cookie_domain,
      expires: expires,
      secure: cs.protocol === 'https'
    });
  };

  /**
   * Function for getting of cookies, taking into account cookies prefix
   *
   * @param {string}			name
   *
   * @return {bool|string}
  */


  cs.getcookie = function(name) {
    name = cs.cookie_prefix + name;
    return $.cookie(name);
  };

  /**
   * Sign in into system
   *
   * @param {string} login
   * @param {string} password
  */


  cs.sign_in = function(login, password) {
    login = String(login).toLowerCase();
    password = String(password);
    return $.ajax({
      url: 'api/System/user/sign_in',
      cache: false,
      data: {
        login: cs.hash('sha224', login)
      },
      type: 'post',
      success: function(random_hash) {
        if (random_hash.length === 56) {
          return $.ajax('api/user/sign_in', {
            cache: false,
            data: {
              login: cs.hash('sha224', login),
              auth_hash: cs.hash('sha512', cs.hash('sha224', login) + cs.hash('sha512', cs.hash('sha512', password) + cs.public_key) + navigator.userAgent + random_hash)
            },
            type: 'post',
            success: function(result) {
              if (result === 'reload') {
                return location.reload();
              }
            }
          });
        } else if (random_hash === 'reload') {
          return location.reload();
        }
      }
    });
  };

  /**
   * Sign out
  */


  cs.sign_out = function() {
    return $.ajax({
      url: 'api/System/user/sign_out',
      cache: false,
      data: {
        sign_out: true
      },
      type: 'post',
      success: function() {
        return location.reload();
      }
    });
  };

  /**
   * Registration in the system
   *
   * @param {string} email
  */


  cs.registration = function(email) {
    if (!email) {
      alert(L.please_type_your_email);
      return;
    }
    email = String(email).toLowerCase();
    return $.ajax({
      url: 'api/System/user/registration',
      cache: false,
      data: {
        email: email
      },
      type: 'post',
      success: function(result) {
        if (result === 'reg_confirmation') {
          return $('<div>' + L.reg_confirmation + '</div>').appendTo('body').cs().modal('show').on('uk.modal.hide', function() {
            return $(this).remove();
          });
        } else if (result === 'reg_success') {
          return $('<div>' + L.reg_success + '</div>').appendTo('body').cs().modal('show').on('uk.modal.hide', function() {
            return location.reload();
          });
        }
      }
    });
  };

  /**
   * Password restoring
   *
   * @param {string} email
  */


  cs.restore_password = function(email) {
    if (!email) {
      alert(L.please_type_your_email);
      return;
    }
    email = String(email).toLowerCase();
    return $.ajax({
      url: 'api/System/user/restore_password',
      cache: false,
      data: {
        email: cs.hash('sha224', email)
      },
      type: 'post',
      success: function(result) {
        if (result === 'OK') {
          return $('<div>' + L.restore_password_confirmation + '</div>').appendTo('body').cs().modal('show').on('uk.modal.hide', function() {
            return $(this).remove();
          });
        }
      }
    });
  };

  /**
   * Password changing
   *
   * @param {string} current_password
   * @param {string} new_password
  */


  cs.change_password = function(current_password, new_password) {
    if (!current_password) {
      alert(L.please_type_current_password);
      return;
    } else if (!new_password) {
      alert(L.please_type_new_password);
      return;
    } else if (current_password === new_password) {
      alert(L.current_new_password_equal);
      return;
    }
    current_password = cs.hash('sha512', cs.hash('sha512', String(current_password)) + cs.public_key);
    new_password = cs.hash('sha512', cs.hash('sha512', String(new_password)) + cs.public_key);
    return $.ajax({
      url: 'api/System/user/change_password',
      cache: false,
      data: {
        verify_hash: cs.hash('sha224', current_password + session_id),
        new_password: cs.xor_string(current_password, new_password)
      },
      type: 'post',
      success: function(result) {
        if (result === 'OK') {
          return alert(L.password_changed_successfully);
        } else {
          return alert(result);
        }
      }
    });
  };

  /**
   * For textarea in blocks editing
   *
   * @param item
  */


  cs.block_switch_textarea = function(item) {
    $('#cs-block-content-html, #cs-block-content-raw-html').hide();
    switch ($(item).val()) {
      case 'html':
        $('#cs-block-content-html').show();
        break;
      case 'raw_html':
        $('#cs-block-content-raw-html').show();
    }
  };

  /**
   * Encodes data with MIME base64
   *
   * @param {string} str
  */


  cs.base64_encode = function(str) {
    return window.btoa(str);
  };

  /**
   * Encodes data with MIME base64
   *
   * @param {string} str
  */


  cs.base64_decode = function(str) {
    return window.atob(str);
  };

  /**
   * Bitwise XOR operation for 2 strings
   *
   * @param {string} string1
   * @param {string} string2
   *
   * @return {string}
  */


  cs.xor_string = function(string1, string2) {
    var j, len1, len2, pos, _i, _ref;
    len1 = string1.length;
    len2 = string2.length;
    if (len2 > len1) {
      _ref = [string2, string1, len2, len1], string1 = _ref[0], string2 = _ref[1], len1 = _ref[2], len2 = _ref[3];
    }
    for (j = _i = 0; 0 <= len1 ? _i < len1 : _i > len1; j = 0 <= len1 ? ++_i : --_i) {
      pos = j % len2;
      string1 = string1.replaceAt(j, String.fromCharCode(string1.charCodeAt(j) ^ string2.charCodeAt(pos)));
    }
    return string1;
  };

  /**
   * Asynchronous execution of array of the functions
   *
   * @param {function[]}	functions
   * @param {int}			timeout
  */


  cs.async_call = function(functions, timeout) {
    var i;
    timeout = timeout || 0;
    for (i in functions) {
      if (!__hasProp.call(functions, i)) continue;
      setTimeout(functions[i], timeout);
    }
  };

}).call(this);
