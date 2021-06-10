Calendar.setup({
  weekNumbers: false,
  inputField: "start_time",
  trigger: "start_time",
  dateFormat: "%Y-%m-%d",
  showTime: false,
  minuteStep: 1,
  onSelect: function () {
    this.hide();
  },
});
Calendar.setup({
  weekNumbers: false,
  inputField: "end_time",
  trigger: "end_time",
  dateFormat: "%Y-%m-%d",
  showTime: false,
  minuteStep: 1,
  onSelect: function () {
    this.hide();
  },
});

$('#searchid').css('display','');