export default function (st) {
  st = this.toLowerCase()
  st = st.replace(/[\u00C0-\u00C5]/ig, 'a')
  st = st.replace(/[\u00C8-\u00CB]/ig, 'e')
  st = st.replace(/[\u00CC-\u00CF]/ig, 'i')
  st = st.replace(/[\u00D2-\u00D6]/ig, 'o')
  st = st.replace(/[\u00D9-\u00DC]/ig, 'u')
  st = st.replace(/[\u00D1]/ig, 'n')
  st = st.replace(/[^a-z0-9 ]+/gi, '')
  st = st.trim().replace(/ /g, '-')
  st = st.replace(/[\-]{2}/g, '')
  return (st.replace(/[^a-z\- ]*/gi, ''))
}
