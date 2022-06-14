## Set up icy.tools API key

Create a `.env` file based on the sample provided:

```bash
cp .env.sample .env
```

Go to [https://developers.icy.tools](https://developers.icy.tools) and sign up for a free account. Once signed up, click the settings icon in the top right corner to see your API key.

<img alt="Settings page with API keys on the icy.tools dashboard" src="https://user-images.githubusercontent.com/12433465/172953739-55c1bca6-4a3a-48d2-aa3e-37d0957a84d2.png">

### Start Development Server

```bash
yarn
yarn dev
```

Open [localhost:3000](http://localhost:3000/) to see the project.

### Deploy to Vercel

```bash
yarn vercel
```

### GraphQL Query

```jsx
// app/queries.jsx

export const TRENDING_COLLECTIONS = `{
  contracts(orderBy: SALES, orderDirection: DESC) {
    edges {
      node {
        address
        ... on ERC721Contract {
          name
          stats {
            totalSales
            average
          }
        }
      }
    }
  }
}`
```

### Index Routes and Loader Functions

```jsx
// app/routes/index.jsx

import { useLoaderData } from "@remix-run/react"
import { TRENDING_COLLECTIONS } from "../queries.jsx"

export let loader = async () => {
  const res = await fetch(
    'https://graphql.icy.tools/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY
      },
      body: JSON.stringify({
        query: TRENDING_COLLECTIONS
      })
    }
  )
  const contracts = await res.json()
  return contracts
}

export default function Index() {
  const { data } = useLoaderData()
  const { contracts } = data
  const { edges } = contracts
  console.log(edges)

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Icy Tools with Remix</h1>
      <ul>
        {edges.map(({ node }) => (
          <li key={node.address}>
            {node.name} - {node.address}
          </li>
        ))}
      </ul>
    </div>
  )
}
```