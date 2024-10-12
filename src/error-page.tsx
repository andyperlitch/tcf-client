import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error; // Specify Error as the type for the error variable
  console.error(error);

  return (
    <>
      <div className="max-w-3xl mx-auto justify-center relative z-[2] font-hand text-center p-12">
        <h1 className="text-8xl mb-8">Oops!</h1>
        <p className="text-4xl">Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    </>
  );
}
