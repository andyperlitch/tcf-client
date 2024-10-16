import { useParams } from "react-router-dom";

export function Event() {
  const { slug } = useParams();

  return (
    <div>
      <h1>Event</h1>
    </div>
  );
}
