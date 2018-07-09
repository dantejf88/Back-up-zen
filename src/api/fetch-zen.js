import rp from 'request-promise'

var getZen = () => {
  let request = {
    method: 'GET',
    url: 'https://api.github.com/zen'
  }

  return rp(request)
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((error) => {
      throw new Error('GET request failed', error);
    })
}

export default getZen
