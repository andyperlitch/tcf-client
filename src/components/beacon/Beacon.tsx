import styles from "@/styles/Radiate.module.css";

export function Beacon({
  state,
}: {
  state: "active" | "inactive" | "pending" | "error";
}) {
  return (
    <div
      className={`
        h-3 w-3 rounded-full

        ${STATE_CLASSES[state]}
      `}
    />
  );
}

const STATE_CLASSES = {
  active: `bg-green-500 ${styles.radiateGreen}`,
  inactive: "bg-gray-500",
  pending: "bg-yellow-500",
  error: "bg-red-500",
};
