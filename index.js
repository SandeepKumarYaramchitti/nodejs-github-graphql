const fetch = require('node-fetch')

require('dotenv').config();
const ACCESS_TOKEN = process.env.MY_TOKEN

const query = `
    query {
        repository(owner:"angular", name: "angular") {
            issues(states:OPEN) {
                totalCount
            }
        }
    }`;

// @ts-ignore
fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({query}),
    headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
    },
}).then(res => res.text())
  .then(body => console.log(body))
  .catch(error => console.log(error)); 