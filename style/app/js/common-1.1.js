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