import ReactMarkdown from "react-markdown";
import styles from "./Markdown.module.css";

export function Markdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <ReactMarkdown
      className={`
        ${styles.markdown}
        ${className}
      `}
    >
      {children}
    </ReactMarkdown>
  );
}
