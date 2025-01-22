import { AdminContainer } from "@/components/AdminContainer";
import { MasterSongList } from "./MasterSongList";
import { FetchGoogleSheetsButton } from "./FetchGoogleSheetsButton";

export function AdminSongsPage() {
  return (
    <AdminContainer section="songs">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-3xl">Master Song List</h1>
          <FetchGoogleSheetsButton />
        </div>
        <MasterSongList />
      </div>
    </AdminContainer>
  );
}
