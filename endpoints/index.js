const google = {
  method: 'GET',
  endpoint: 'https://www.google.com',
  counterName: 'google',
}

const yahoo = {
  method: 'GET',
  endpoint: 'https://www.yahoo.com',
  counterName: 'yahoo',
}

const httpbin = {
  method: 'GET',
  endpoint: 'https://httpbin.org',
  counterName: 'httpbin',
}

// Test the endpoint that returns the current version of StepZen
const stepzenVersion = {
  method: 'GET',
  endpoint: 'https://test.stepzen.net/version',
  counterName: 'stepzenversion',
}

// Test a "light" query on your StepZen GraphQL Endpoint
// In example a query that calls just one data source and contains no nested fields
const stepzenLight = {
  endpoint: 'REPLACE_WITH_YOUR_STEPZEN_ENDPOINT',
  counterName: 'stepzenLight',
  headers: {
    Authorization: 'apikey ' + __ENV.API_KEY,
  },
  body: JSON.stringify({
    query: `
      query MyQuery {
        // INSERT_YOUR_OWN_QUERY
      }
    `,
  }),
}

// Test a "heavy" query on your StepZen GraphQL Endpoint
// In example a query that needs to call multiple data sources and contains heavily nested fields
const stepzenHeavy = {
  endpoint: 'REPLACE_WITH_YOUR_STEPZEN_ENDPOINT',
  counterName: 'stepzenHeavy',
  headers: {
    Authorization: 'apikey ' + __ENV.API_KEY,
  },
  body: JSON.stringify({
    query: `
      query MyQuery {
        // INSERT_YOUR_OWN_QUERY
      }
    `,
  }),
}

function graphqlTarget(target) {
  return {
    method: () => {
      return 'POST'
    },
    endpoint: () => {
      return target.endpoint
    },
    counterName: () => {
      return target.counterName
    },
    headers: () => {
      if (
        target.headers[
          Object.keys(target.headers).find(
            k => k.toLowerCase() === 'content-type',
          )
        ]
      ) {
        return target.headers
      }
      var headers = new Map(target.headers)
      headers['content-type'] = 'application/json'
      return headers
    },
    body: () => {
      return target.body
    },
  }
}

function fixedTarget(target) {
  return {
    method: () => {
      return target.method
    },
    endpoint: () => {
      return target.endpoint
    },
    counterName: () => {
      return target.counterName
    },
    headers: () => {
      return target.headers
    },
    body: () => {
      return target.body
    },
  }
}

export const targets = [
  {target: fixedTarget(google), weight: 0},
  {target: fixedTarget(yahoo), weight: 0},
  {target: fixedTarget(httpbin), weight: 0},
  {target: fixedTarget(stepzenVersion), weight: 1},
  {target: graphqlTarget(stepzenLight), weight: 0},
  {target: graphqlTarget(stepzenHeavy), weight: 0},
]
