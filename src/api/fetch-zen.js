import rp from 'request-promise'

var getZen = () => {
  let request = {
    method: 'GET',
    url: 'https://api.github.com/zen',
    header: {"Authorization": "Basic e0f73767684948d2bceacb039b39fefcf41e62d5"}
  }

  return rp(request)
    .then((response) => {
      console.log(response)
      return response;
    })
    .catch((error) => {
      throw new Error('GET request failed', error);
    });
};

export default getZen


// export default function zen (){
// var url = "https://api.github.com/zen"
// return fetch(url,
//         {
//           method: "get"
//         }
//       )
//     .then(response => {
//       if(response.ok){
//       console.log(response)}
//     })
//     .catch((error) => {
//           throw new Error('GET request failed', error);
//         })
//
// }
