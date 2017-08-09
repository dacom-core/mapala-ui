export default function generate_API_fetcher (api_path) {
  return function () {
    return axios.get(api_path).then((response) => {
      // console.log(api_path, 'api fetcher success, status code', response.status)
      if (response.status !== 200) {
        // console.log('considered a bad code, thus rejected')
        return Promise.reject(response)
      }
      // console.log(response.data.length
      //   ? `there are ${response.data.length} items in the response`
      //   : 'can`t identify response.data.length')
      return Promise.resolve(response)
    }).catch((response) => {
      console.log(api_path, 'API FETCHER ERROR, status code', response.status)
      return Promise.reject(response)
    })
  }
}
