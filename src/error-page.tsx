import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error; // Specify Error as the type for the error variable
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message}</i>
      </p>
    </div>
  );
}
