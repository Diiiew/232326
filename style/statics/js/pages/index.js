function ResumeError() {
  return true;
}
window.onerror = ResumeError;
$(function () {
  $("#leftMain").load("__URL__/leftFrame/");
});

//clientHeight-0; 空白值 iframe自适应高度
function windowW() {
  if ($(window).width() < 980) {
    $(".header").css("width", 980 + "px");
    $("#content").css("width", 980 + "px");
    $("body").attr("scroll", "");
    $("body").css("overflow", "");
  }
}
windowW();
$(window).resize(function () {
  if ($(window).width() < 980) {
    windowW();
  } else {
    $(".header").css("width", "auto");
    $("#content").css("width", "auto");
    $("body").attr("scroll", "no");
    $("body").css("overflow", "hidden");
  }
});
window.onresize = function () {
  var heights = document.documentElement.clientHeight - 150;
  document.getElementById("rightMain").height = heights;
  var openClose = $("#rightMain").height() + 39;
  $("#center_frame").height(openClose + 9);
  $("#openClose").height(openClose + 30);
};
window.onresize();

//站点选择
function site_select(id, name, domain, siteid) {}
//隐藏站点下拉。
var s = 0;
var h;
function hidden_site_list() {
  s++;
  if (s >= 3) {
    $(".tab-web-panel").hide();
    clearInterval(h);
    s = 0;
  }
}
function clearh() {
  if (h) clearInterval(h);
}
function hidden_site_list_1() {
  h = setInterval("hidden_site_list()", 1);
}

//左侧开关
$("#openClose").click(function () {
  if ($(this).data("clicknum") == 1) {
    $("html").removeClass("on");
    $(".left_menu").removeClass("left_menu_on");
    $(this).removeClass("close");
    $(this).data("clicknum", 0);
  } else {
    $(".left_menu").addClass("left_menu_on");
    $(this).addClass("close");
    $("html").addClass("on");
    $(this).data("clicknum", 1);
  }
  return false;
});

function _MP(menuid, targetUrl) {
  $("#menuid").val(menuid);

  $("#rightMain").attr("src", targetUrl);
  $(".sub_menu").removeClass("on fb blue");
  $("#_MP" + menuid).addClass("on fb blue");

  show_help(targetUrl);
}
