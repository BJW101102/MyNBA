const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://api-basketball.p.rapidapi.com/teams',
  params: {
    league: '12',
    season: '2019-2020'
  },
  headers: {
    'X-RapidAPI-Key': 'b2a90f6514msh27c59dfd5ded947p1f4eb9jsnf4de5e98eb53',
    'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}