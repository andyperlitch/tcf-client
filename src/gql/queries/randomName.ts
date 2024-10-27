import { gql } from "@apollo/client";

export const randomName = gql`
  query RandomName {
    randomName
  }
`;
