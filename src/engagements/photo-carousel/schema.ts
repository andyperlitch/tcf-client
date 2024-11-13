import { gql } from "@apollo/client";

gql`
  fragment PhotoCarouselViewConfigFields on PhotoCarouselViewConfig {
    maxSubmissionsPerUser
  }
  fragment PhotoCarouselViewDataFields on PhotoCarouselViewData {
    visibleSubmission
  }
  fragment PhotoCarouselSubmissionFields on PhotoCarouselSubmissionData {
    photoUrl
    caption
    approved
  }
  fragment PhotoCarouselAdminConfigFields on PhotoCarouselAdminConfig {
    maxSubmissionsPerUser
    requireApproval
  }
  fragment PhotoCarouselAdminDataFields on PhotoCarouselAdminData {
    visibleSubmission
    rejectedQueue
    unapprovedQueue
    unseenQueue
    seenQueuePointer
  }
`;
