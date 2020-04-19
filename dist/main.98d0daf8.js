// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li:last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  name: 'w3c',
  url: 'https://www.w3.org/',
  logo: 'W'
}, {
  name: 'MDN',
  url: 'https://developer.mozilla.org/zh-CN/',
  logo: 'M'
}, {
  name: '张鑫旭',
  url: 'https://www.zhangxinxu.com/wordpress/',
  logo: '张'
}]; // 简化URL

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); // 删除 / 开头的内容
}; // 简化网站名称


var simplifyName = function simplifyName(name) {
  var sim = name.replace('[^\w]*', '').replace('-', '').replace(',', '').replace('，', '').trim();
  console.log();
};

var render = function render() {
  $siteList.find('li:not(:last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n        <div class=\"site\">\n          <div class=\"siteLogo\">".concat(node.logo, "</div>\n          <span class=\"siteName\">").concat(node.name, "</span>\n            <div class=\"removeSite\">\n                <svg class=\"icon\" aria-hidden=\"true\">\n                    <use xlink:href=\"#icon-delete\"></use>\n                </svg>\n            </div>\n        </div>\n      </li>")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.removeSite', function (e) {
      e.stopPropagation(); // 阻止冒泡

      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.addSite').on('click', function () {
  var url = window.prompt('请问你要添加的网址是啥？');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  console.log('%c 添加的网站的URL: ', 'color: orange; font-weight: bold;', url);
  var request = new XMLHttpRequest();
  request.open('GET', "http://textance.herokuapp.com/title/".concat(url));

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status <= 300) {
        console.log('title获取成功！');
        var data = request.response;
        console.log(request.response);
        console.log(simplifyName(data));
        hashMap.push({
          name: simplifyName(data),
          logo: simplifyName(data)[0].toUpperCase(),
          url: url,
          description: '描述'
        });
        render();
      } else {
        alert('Title获取失败');
      }
    }
  };

  request.send();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.98d0daf8.js.map