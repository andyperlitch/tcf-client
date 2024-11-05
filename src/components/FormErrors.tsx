export function FormErrors({ errors }: { errors: string[] }) {
  return (
    <div
      className={`
        rounded-md border-2 border-solid border-red-500 bg-red-700 p-4
        text-red-200
      `}
    >
      {errors.map((e) => (
        <div key={e}>{e}</div>
      ))}
    </div>
  );
}
