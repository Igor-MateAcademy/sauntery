/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPathsData = /* GraphQL */ `
  mutation CreatePathsData(
    $input: CreatePathsDataInput!
    $condition: ModelPathsDataConditionInput
  ) {
    createPathsData(input: $input, condition: $condition) {
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
export const updatePathsData = /* GraphQL */ `
  mutation UpdatePathsData(
    $input: UpdatePathsDataInput!
    $condition: ModelPathsDataConditionInput
  ) {
    updatePathsData(input: $input, condition: $condition) {
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
export const deletePathsData = /* GraphQL */ `
  mutation DeletePathsData(
    $input: DeletePathsDataInput!
    $condition: ModelPathsDataConditionInput
  ) {
    deletePathsData(input: $input, condition: $condition) {
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
