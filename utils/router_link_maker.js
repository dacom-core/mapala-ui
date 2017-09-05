export default function (action, identifier, permalink = '') {
  let link

  if (action === 'post-view') {
    link = `/${identifier}/post/${permalink}/`
  } else if (action === 'edit') {
    link = `/${identifier}/post/${permalink}/edit/`
  } else if (action === 'create') {
    link = `/${identifier}/post/create/`
  }

  return link
}
