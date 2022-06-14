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