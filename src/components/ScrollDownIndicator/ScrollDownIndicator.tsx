import styles from "./scrollDown.module.css";

export function ScrollDownIndicator() {
  return (
    <div
      className={`
        flex h-[50vh] flex-col items-center

        ${styles.matchOpacityToScrollDown}
      `}
    >
      <div className="text-3xl">下にスクロール！</div>
      <div
        className={`
          text-5xl

          ${styles.scrollDown}
        `}
      >
        👇
      </div>
    </div>
  );
}
