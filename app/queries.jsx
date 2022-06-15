export const TRENDING_COLLECTIONS = `{
  contracts(orderBy: SALES, orderDirection: DESC, first: 10) {
    edges {
      node {
        address
        ... on ERC721Contract {
          name
          stats {
            totalSales
            average
            ceiling
            floor
            volume
          }
          symbol
        }
      }
    }
  }
}`