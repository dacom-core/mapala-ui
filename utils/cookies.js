export function set_cookie (cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export function get_cookie (cname, req) {
  const name = cname + '='
  let decodedCookie
  if (typeof window === 'undefined') decodedCookie = decodeURIComponent(req.headers.cookie)
  else decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export function delete_cookie (cname) {
  return set_cookie(cname, '', -1)
}
