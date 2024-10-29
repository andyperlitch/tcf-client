import { gql } from "@apollo/client";

export const stageGetSubmission = gql`
  query stageGetSubmission($id: Int!) {
    submission(id: $id) {
      ...StageSubmission
    }
  }
`;
