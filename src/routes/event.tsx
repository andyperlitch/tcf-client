import { useParams } from "react-router-dom";

export function Event() {
  const params = useParams();
  console.log(`andy params`, params);

  return (
    <div>
      <h1>Event</h1>
    </div>
  );
}
