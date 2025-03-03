import { gql } from "@apollo/client";

gql`
  fragment VoteForViewConfigFields on VoteForViewConfig {
    votesPerUser
  }
  fragment VoteForViewDataFields on VoteForViewData {
    votes {
      submissionId
      count
    }
  }
  fragment VoteForSubmissionFields on VoteForSubmissionData {
    title
    color
    description
    optionalImageUrl
  }
  fragment VoteForAdminConfigFields on VoteForAdminConfig {
    votesPerUser
    allowUserSubmissions
    maxSubmissionsPerUser
  }
  fragment VoteForAdminDataFields on VoteForAdminData {
    votes {
      submissionId
      count
    }
    startTime
    endTime
  }
`;
