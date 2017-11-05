const endpoint = 'https://gateway.marvel.com:443/v1/public';
const apiKey = '4a774e5516f38b3e92843d5b4babcd45';

export const query = path => {
  return fetch(`${endpoint}${path}&apikey=${apiKey}`)
    .then(response => response.json());
}
