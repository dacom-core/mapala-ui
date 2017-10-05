export default function shareVK (post) {
  let url = 'https://vkontakte.ru/share.php?'
  const pageUrl = `${window.location.origin}/${post.author.username}/${post.permlink}`
  post.body.replace(/<\/?[^>]+(>|$)/g, '')

  url += 'url=' + encodeURIComponent(pageUrl)
  url += '&title=' + encodeURIComponent(post.title)
  url += '&image=' + encodeURIComponent(post.miniature)
  url += '&noparse=true'
  window.open(url, '', 'toolbar=0,status=0,width=626,height=436')
}
