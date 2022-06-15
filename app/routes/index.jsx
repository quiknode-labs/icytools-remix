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

  return (
    <div className="App">
      <h1>Welcome to icy.tools with Remix</h1>
      <h3>Stats in last hour</h3>
      <table>
        <thead>
          <td>Collection</td>
          <td style={{ textAlign: "right" }}>Floor</td>
          <td style={{ textAlign: "right" }}>Volume</td>
          <td style={{ textAlign: "right" }}>Total Sales</td>
          <td style={{ textAlign: "right" }}>Average</td>
        </thead>
        <tbody>
          {data.contracts.edges.map(
            (collection) => {
              return (
                <tr key={collection.node.address}>
                  <td>{collection.node.name}</td>
                  <td className="mono">Ξ{collection.node.stats.floor.toFixed(3)}</td>
                  <td className="mono">Ξ{collection.node.stats.volume.toFixed(3)}</td>
                  <td className="mono">{collection.node.stats.totalSales}</td>
                  <td className="mono">Ξ{collection.node.stats.average.toFixed(3)}</td>
                </tr>
              )
            }
          )}
        </tbody>
      </table>
    </div>
  )
}