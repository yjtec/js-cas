import {
  parse,
  stringify
} from 'qs';
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
export function urlExcept(ref, url) {
  if (url.indexOf(ref) === -1) {
    return url;
  }
  var arr_url = url.split('?');
  var base = arr_url[0];
  var arr_param = arr_url[1].split('&');
  var index = -1;
  for (let i = 0; i < arr_param.length; i++) {
    var paired = arr_param[i].split('=');
    if (paired[0] == ref) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    return url;
  } else {
    arr_param.splice(index, 1);
    return base + "?" + arr_param.join('&');
  }
}