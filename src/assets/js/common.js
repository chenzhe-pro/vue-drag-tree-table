/**
 * Created by chenzhe on 17/3/8.
 */
var icon = require('../img/logo.png');

function init() {
  /**
   * 初始化项目
   */
  this.init = function () {
    // var hostName = window.location.protocol + "//" + window.location.host + "/",//正式业务服务
    //   loginName = window.location.protocol + "//" + window.location.host + "/",//正式授权服务
      var hostName = "http://ams-dev.ruan-xing.com:6080",//开发业务服务
        loginName = "http://ams-dev.ruan-xing.com:6080",//开发授权服务
        // var hostName = "http://ams-local.ruan-xing.com:6080",//开发业务服务
        // loginName = "http://ams-local.ruan-xing.com:6080",//开发授权服务
      // var hostName=window.location.protocol + "//" + window.locat.ion.host+"",//上线打开
      subProject = "api";
    this.hostName = hostName;
    this.loginName = loginName;
    this.projectPath = hostName + subProject;

    window.common = this;
  };

  // String.prototype.trim = function()
  // {
  //   return this.replace(/\s+/g,"");
  // }
}

class common {
  constructor() {
    // 添加各种api方法
    /**
     * 返回数组中出现次数最多的值和出现次数
     * @returns
     */
    Array.prototype.getMost = function () {
      var obj = this.reduce((p, n) => (p[n]++ || (p[n] = 1), (p.max = p.max >= p[n] ? p.max : p[n]), (p.key = p.max > p[n] ? p.key : n), p), {});
      return {key: obj.key, length: obj.max};
    };
    Array.max = function (array) {
      return Math.max.apply(Math, array);
    };
    Array.min = function (array) {
      return Math.min.apply(Math, array);
    };
  }

  /**
   * 递归法遍历树
   * @param jsonTree 树
   * @param callback 遍历到每个节点要执行的回调方法
   * @param deep 每个节点的深度值
   * @param key 字节点名称
   */
  eachTree(jsonTree, callback, deep = 0, key) {
    let array = [];
    if (
      typeof jsonTree == 'object' &&
      jsonTree.constructor === Object.prototype.constructor
    ) {
      array.push(jsonTree);
    } else array = jsonTree;
    let jn;
    for (let i = array.length - 1; i >= 0; i--) {
      jn = array[i];
      // 找到节点,执行相应代码
      if (callback) {
        /**
         * callback 遍历节点,执行相应代码
         * @param jn
         * @param array
         * @param i
         */
        if (!callback(jn, array, i)) {
          return false;
        }
        if (jn[key] && jn[key].length > 0) {
          this.eachTree(jn[key], callback, deep + 1, key);
        }
      }
    }
  }
  /**
   * 广度优先遍历树(非递归法)
   * @param jsontree 树数据
   * @param callback 遍历到每个节点要执行的回调方法
   */
  eachTreeBreadth(jsontree, callback, key) {
    if (!jsontree || !jsontree.length) return;

    var stack = [];

    //先将第一层节点放入栈
    for (var i = 0, len = jsontree.length; i < len; i++) {
      stack.push(jsontree[i]);
    }

    var item;

    while (stack.length) {
      item = stack.shift();

      if (callback) callback(item);
      // console.log(item.title);

      //如果该节点有子节点，继续添加进入栈底
      if (item[key] && item[key].length) {
        stack = stack.concat(item[key]);
      }
    }
  };

  stringify(data) {
    let ret = '';
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    ret = ret.substring(0, ret.length - 1);
    return ret
  };
  jsonToBlob (json) {
    return new Blob([JSON.stringify(json)], {
      type: 'application/json'
    });
  }

  loading(vue, opt) {
    if (opt.text === undefined) opt.text = '';
    opt.customClass = 'custom_loading';
    opt.spinner = 'el-icon-loading';
    var instance = vue.$loading(opt), time = opt.time ? opt.time : 400;
    return {
      instance: instance,
      close: function () {
        setTimeout(function () {
          instance.close();
        }, time)
      }
    };
  };

  authorize() {
    window.quicker.delCookie('access_token', '/');
    window.location.href = process.env.VUE_APP_authPath + 'oauth/authorize?response_type=token&client_id=' + 'ams_web' + '&' +
      'redirect_uri=' + encodeURIComponent(window.location.href) + (window.location.href.indexOf('?')>-1?'&':'?');
  };
  logout() {
    window.quicker.delCookie('access_token', '/');
    window.location.href = process.env.VUE_APP_authPath + 'logout';
  };
  object_format(obj, type) {
    // obj=JSON.parse(JSON.stringify(obj));
    for (var key in obj) {
      if (obj[key] && obj[key][type] !== undefined) {
        obj[key] = obj[key][type];
      }
    }
  };

  array_format(arr, type) {
    arr.forEach((item, index) => {
      this.object_format(item, type);
    });
  };
  uniqueArray(arr) {
    return arr.filter(function(item, index, arr) {
      //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
      return arr.indexOf(item, 0) === index;
    });
  }
}

let com = new common();
window.common = com;
export default com;
