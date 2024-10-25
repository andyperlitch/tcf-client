import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error; // Specify Error as the type for the error variable
  console.error(error);

  return (
    <>
      <div
        className={`
          relative z-[2] mx-auto max-w-3xl justify-center p-12 text-center
          font-hand
        `}
      >
        <h1 className="mb-8 text-8xl">Oops!</h1>
        <p className="text-4xl">Sorry, an unexpected error has occurred.</p>
        <pre
          className={`
            mt-4 rounded-md bg-slate-50 p-3 text-muted text-md font-mono
          `}
        >
          {error.message}
        </pre>
      </div>
    </>
  );
}
