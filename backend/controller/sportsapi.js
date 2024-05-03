const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://api-basketball.p.rapidapi.com/teams',
  params: {
    league: '12',
    season: '2019-2020'
  },
  headers: {
    'X-RapidAPI-Key': 'XXXXXX',
    'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
