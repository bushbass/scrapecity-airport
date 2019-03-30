function ConvertTimeformat(format, str) {
  var time = $('#starttime').val();
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);
  var AMPM = time.match(/\s(.*)$/)[1];
  if (AMPM == 'PM' && hours < 12) hours = hours + 12;
  if (AMPM == 'AM' && hours == 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = '0' + sHours;
  if (minutes < 10) sMinutes = '0' + sMinutes;
  alert(sHours + ':' + sMinutes);
}

$('#btnConvert').on('click', function() {
  ConvertTimeformat('24', $('#txttime').val());
});

// http://jsfiddle.net/L2y2d/1/
