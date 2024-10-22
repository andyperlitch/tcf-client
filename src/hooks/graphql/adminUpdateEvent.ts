import { gql } from "@apollo/client";

export const adminUpdateEvent = gql`
  mutation adminUpdateEvent($id: Int!, $data: UpdateEventInput!) {
    updateEvent(eventId: $id, data: $data) {
      id
      name
      location
      date
      description
      live
      slug
      createdAt
      updatedAt
      engagements {
        id
        description
        viewData
        viewConfig
        createdAt
        updatedAt
        startTime
        endTime
      }
    }
  }
`;
