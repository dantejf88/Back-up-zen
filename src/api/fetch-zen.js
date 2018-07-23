
var getZen = () => {
  let urlApi = "https://api.github.com/zen"
  return fetch(urlApi,
    {
      headers: {
        "Authorization": "token 04b1f2e029f158681f795bdd9d2cb9584bbe5478"
      }
    })
    .then((response) => {
      return response.text()
    })
    .catch((error) => {
      throw new Error('GET request failed', error);
    })
  }
  export default getZen
  
// import rp from 'request-promise'
//
// var getZen = () => {
//   let request = {
//     method: 'GET',
//     url: 'https://api.github.com/zen',
//     headers: {
//       "Authorization": "token 04b1f2e029f158681f795bdd9d2cb9584bbe5478"
//     }
//   }
//   return rp(request)
//     .then((response) => {
//       return response
//     })
//     .catch((error) => {
//       throw new Error('GET request failed', error);
//     })
// }
// export default getZen
