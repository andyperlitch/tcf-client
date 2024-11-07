import { gql } from "@apollo/client";

gql`
  query stageGetSubmission($id: Int!) {
    submission(id: $id) {
      ...StageSubmission
    }
  }
`;
