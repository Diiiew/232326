//获取url参数
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

//调用原生系统函数
function call_native_func(method, params) {
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        //ios
        if(typeof(window.webkit) === 'object') {
            window.webkit.messageHandlers.myapp.postMessage({
                'method': method,
                'params': params
            });
        } else {
            $.alert('你的版本不支持');
        }
    } else {
        //andorid
        if(typeof(window['myapp']) === 'object') {
            if(params) {
                window['myapp'][method].apply(window['myapp'], [JSON.stringify(params)]);
            } else {
                window['myapp'][method].apply(window['myapp']);
            }
        } else {
            $.alert('你的版本不支持');
        }
    }
}

//调用原生系统函数，返回数据
function call_native_func_data(method, params) {
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        var ver = getUrlVars()['ver'];
        if(!ver
            || (ver > '1.0.0' && ver < '1.3.8')
            || (ver > '2.0.0' && ver < '2.3.8')){
            return null;
        }

        //ios
        if(typeof(window.webkit) === 'object'
            && typeof(window.prompt) === 'function') {
            return window.prompt(method,'');
        } else {
            return null;
        }
    } else {
        //android
        if(typeof(window['myapp']) === 'object'
            && typeof(window['myapp'][method]) === 'function') {
            if(params) {
                return window['myapp'][method].apply(window['myapp'], [JSON.stringify(params)]);
            } else {
                return window['myapp'][method].apply(window['myapp']);
            }
        } else {
            return null;
        }
    }
}

//从App获取当前用户信息
//id int
//is_im bool
function get_current_user_info() {
    if (is_in_app()) {
        var response = call_native_func_data('userInfo', '');
        if(response === null) {
            return null;
        }

        var user_info = JSON.parse(response);
        if(user_info === null) {
            return null;
        }

        //统一类型
        user_info['id'] = parseInt(user_info['id']);
        user_info['is_im'] = user_info['is_im'] === true || user_info['is_im'] === 1;
        return user_info;
    } else {
        return null;
    }
}

//页面是否在App内
function is_in_app() {
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        //ios
        return typeof(window.webkit) === 'object';
    } else {
        //andorid
        return typeof(window['myapp']) === 'object';
    }
}

//复制信息
function copyText(text, msg) {
    var el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        // save current contentEditable/readOnly status
        var editable = el.contentEditable;
        var readOnly = el.readOnly;

        // convert to editable with readonly to stop iOS keyboard opening
        el.contentEditable = true;
        el.readOnly = true;

        // create a selectable range
        var range = document.createRange();
        range.selectNodeContents(el);

        // select the range
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        el.setSelectionRange(0, 999999);

        // restore contentEditable/readOnly to original state
        el.contentEditable = editable;
        el.readOnly = readOnly;
    } else {
        el.select();
    }

    document.execCommand('copy');
    document.body.removeChild(el);
    $.alert(msg);
}

//随机排序
function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

//获取系统平台
function get_platform() {
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        return 'iOS';
    } else {
        return 'android';
    }
}