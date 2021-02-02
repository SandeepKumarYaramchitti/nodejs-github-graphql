const fetch = require('node-fetch')

require('dotenv').config();
const ACCESS_TOKEN = process.env.MY_TOKEN


const query = `
  query {
    repository(owner:"angular", name:"angular") {
      issues(first:100, states:OPEN) {
        totalCount
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            title
            labels(first:5) {
              edges {
                node {
                  name
                }
              }
            }
            comments(first:20) {
              totalCount
              edges {
                node {
                  author {
                    avatarUrl
                    login
                  }
                  createdAt
                  reactions {
                    totalCount
                  }
                }
              }
            }
            reactions {
              totalCount
            } 
          }
        }
      }
    }
  }
  `    

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