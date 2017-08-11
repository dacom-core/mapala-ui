export default function (action, username, permalink = '') {
  let link

  if (action === 'post-view') {
    link = `/${username}/post/${permalink}/`
  } else if (action === 'edit') {
    link = `/${username}/post/${permalink}/edit/`
  } else if (action === 'create') {
    link = `/${username}/post/create/`
  }

  return link
}
