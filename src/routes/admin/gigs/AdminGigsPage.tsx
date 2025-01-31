import { AdminContainer } from "@/components/AdminContainer";
import { CreateGigButton } from "./CreateGigButton";
import { useNavigate } from "react-router-dom";
import { GigFragment } from "@/gql/graphql";

export function AdminGigsPage() {
  const navigate = useNavigate();

  const onGigCreated = (gig: GigFragment) => {
    navigate(`/admin/gigs/${gig.id}`);
  };

  return (
    <AdminContainer section="gigs">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-3xl">Gigs</h1>
          <CreateGigButton onSuccess={onGigCreated} />
        </div>
        {/* <GigList /> */}
      </div>
    </AdminContainer>
  );
}
