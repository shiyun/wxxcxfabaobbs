function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function parseHtml(htmlBlock) {
    var parser = new DOMParser();
    return parser.parseFromString(htmlBlock, "text/html");
}

function json2Form(json) {
    var str = [];
    for(var p in json){
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
}

function timeConvert(a) {
    if (a) {
        a = parseInt(a);
        var b, c, d;
        b = parseInt((new Date).getTime() / 1E3) - a;
        d = parseInt(b / 86400);
        c = parseInt(b / 3600);
        b = parseInt(b / 60);
        if (0 < d && 4 > d)
            return d + "\u5929\u524d";
        if (0 >= d && 0 < c)
            return c + "\u5c0f\u65f6\u524d";
        if (0 >= c && 0 < b)
            return b + "\u5206\u949f\u524d";
        a = new Date(1E3 * a);
        return a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate()
    }
    return ""
}

module.exports = {
  formatTime,
  formatNumber,
  parseHtml,
  json2Form,
  timeConvert
}
