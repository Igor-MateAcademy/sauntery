/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPathsData = /* GraphQL */ `
  query GetPathsData($id: ID!) {
    getPathsData(id: $id) {
      id
      title
      shortDescription
      fullDescription
      isFavorite
      points
      region
      createdAt
      updatedAt
    }
  }
`;
export const listPathsData = /* GraphQL */ `
  query ListPathsData(
    $filter: ModelPathsDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPathsData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        shortDescription
        fullDescription
        isFavorite
        points
        region
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
