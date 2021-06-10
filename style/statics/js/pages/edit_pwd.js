window.focus();
$(document).ready(function () {
  $.formValidator.initConfig({
    autotip: true,
    formid: "myform",
    onerror: function (msg) {},
  });
  $("#old_password")
    .formValidator({
      empty: true,
      onshow: "不修改密码请留空。",
      onfocus: "密码应该为6-20位之间",
      oncorrect: "旧密码输入正确",
    })
    .inputValidator({ min: 6, max: 20, onerror: "密码应该为6-20位之间" })
    .ajaxValidator({
      type: "get",
      url: "",
      data: "action=public_password_ajx",
      datatype: "html",
      async: "false",
      success: function (data) {
        if (data == "1") {
          return true;
        } else {
          return false;
        }
      },
      buttons: $("#dosubmit"),
      onerror: "旧密码输入错误",
      onwait: "请稍候...",
    });
  $("#new_password")
    .formValidator({
      empty: true,
      onshow: "不修改密码请留空。",
      onfocus: "密码应该为6-20位之间",
    })
    .inputValidator({ min: 6, max: 20, onerror: "密码应该为6-20位之间" });
  $("#new_pwdconfirm")
    .formValidator({
      empty: true,
      onshow: "不修改密码请留空。",
      onfocus: "请输入两次密码不同。",
      oncorrect: "密码输入一致",
    })
    .compareValidator({
      desid: "new_password",
      operateor: "=",
      onerror: "请输入两次密码不同。",
    });
});
