window.focus();

$(function () {
  if ($.browser.msie && parseInt($.browser.version) < 7)
    $("#browserVersionAlert").show();
});

$("#main_frameid").removeClass("display");
