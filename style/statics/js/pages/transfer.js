$(function () {
  var status = 1; //提交状态 1.可以提交，0不可以提交
  $("#ok").bind("click", function () {
    if (status == 0) {
      alert("充值中，请稍后");
      return false;
    }
    status = 0;
    $.post(
      "__URL__/last_transfer",
      $("#myform").serialize(),
      function (rt) {
        if (rt.status == 0) {
          alert(rt.info);
          status = 1;
          return false;
        } else {
          if (rt.status == 2) {
            var r = confirm(rt.info);
            if (!r) {
              status = 1;
              return false;
            }
          }
          $("#myform").submit();
        }
      },
      "json"
    );
  });
});
