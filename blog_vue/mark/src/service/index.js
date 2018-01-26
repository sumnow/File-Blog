const API_HOST = {
  host: 'http://138.128.192.220',
  port: '8080'
}

function request(config) {

  const configs = {
    url: `${config.url}`,
    method: config.method.toUpperCase() || 'GET',
    params: config.params,
    success: config.success || function () { },
    fail: config.fail || function () { },
  }
  var xmlhttp;
  if (window.XMLHttpRequest) {
    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp = new XMLHttpRequest();
  }
  else {
    // IE6, IE5 浏览器执行代码
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      configs.success(JSON.parse(xmlhttp.responseText));
    } else if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
      configs.fail(xmlhttp.responseText)
    }
  }
  const query = [];
  for (var key in configs.params) {
    query.push(`${key}=${configs.params[key]}`);
  }
  if (configs.method === 'GET') {
    configs.url = configs.url + (query.length ? '?' + query.join('&') : '')
    xmlhttp.open(configs.method, configs.url, true);
    // xmlhttp.setRequestHeader('','');
    xmlhttp.send(null);
  } else if (configs.method === 'POST') {
    xmlhttp.open(configs.method, configs.url, true);
    xmlhttp.send(query.join('&'));
  }
}

export default request;
