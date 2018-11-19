export function request(config) {

  const configs = {
    url: `${config.url}`,
    method: config.method.toUpperCase() || 'GET',
    params: config.params,
    success: config.success || function () { },
    fail: config.fail || function () { },
  }
  var xmlhttp = new XMLHttpRequest();
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

export function fetch(config) {
  return new Promise((resolve, rejecj) => {
    const configs = {
      url: `${config.url}`,
      method: config.method.toUpperCase() || 'GET',
      params: config.params,
      success: config.success || function () { },
      fail: config.fail || function () { },
    }
    request({
      ...configs,
      success: resolve,
      fail: rejecj
    })
  })
}