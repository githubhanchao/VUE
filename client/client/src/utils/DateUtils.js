/**
 * Created by huangjason on 2017/8/7.
 */
import moment from 'moment';

function getDate(type) {
  var date = new Date();
  var y = date.getFullYear();
  var m =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  switch (type) {
    case 1:
      return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s;
      break;
    case 0:
      return y + m + d + h + mi + s;
      break;
    default:
      return y + '-' + m + '-' + d;
  }
}

function dateToTime(date) {
  var date = new Date(date);
  return date.getTime();
}

function timeToDate(time) {
  var date = new Date(time);
  var y = date.getFullYear();
  var m =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s;
}

function getFixedTime(hour) {
  var date = new Date();
  date.setHours(hour);
  date.setMinutes('00');
  date.setSeconds('00');
  date.setMilliseconds('000');
  return date.getTime();
}

function disFixedTime(fixedHour, targetDate) {
  var fixTime = getFixedTime(fixedHour) - 86400 * 1000;
  var currTime = dateToTime(targetDate);
  return (fixTime - currTime) / (3600 * 1000);
}
function disRelativeTime(time) {
  var nowTime = dateToTime(getDate(1));
  return 1;
}

function timestampFormat(timestamp, formatStr) {
  if (timestamp === '0000-00-00 00:00:00') {
    return '';
  }

  if (moment(timestamp).isValid()) {
    return moment(timestamp).format(formatStr);
  }

  return timestamp;
}

export default {
  getDate,
  dateToTime,
  timeToDate,
  disFixedTime,
  disRelativeTime,
  timestampFormat,
};
