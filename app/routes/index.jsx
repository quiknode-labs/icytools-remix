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