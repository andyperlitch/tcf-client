import React, {
  useEffect,
  useRef,
  useState,
  FormEvent,
  forwardRef,
} from "react";
import DOMPurify from "dompurify";

export interface ContentEditableDivProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Handler for content changes.
   */
  onChange: (event: FormEvent<HTMLDivElement>) => void;

  /**
   * The initial or static text content.
   */
  text?: string | null;

  /**
   * If true, `contentEditable` is enabled.
   */
  editable?: boolean;
}

export const ContentEditableDiv = forwardRef<
  HTMLDivElement,
  ContentEditableDivProps
>(({ onChange, text = "", editable = false, ...rest }, forwardedRef) => {
  const [initialText, setInitialText] = useState<string>(text || "");
  const innerRef = useRef<HTMLDivElement>(null);
  const prevEditableRef = useRef<boolean>(editable);

  // Use forwarded ref if provided, otherwise fall back to inner ref
  console.log(`andy forwardedRef`, forwardedRef);
  const contentRef = (forwardedRef ||
    innerRef) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    const wasEditable = prevEditableRef.current;

    // Transitioning from non-editable -> editable
    if (editable && !wasEditable) {
      setInitialText(text || "");

      // Focus and select all text after a short delay to ensure the DOM is ready
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.focus();
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(contentRef.current);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, 0);
    }
    // Transitioning from editable -> non-editable
    else if (!editable && wasEditable && contentRef.current) {
      contentRef.current.innerHTML = DOMPurify.sanitize(initialText);
    }

    prevEditableRef.current = editable;
  }, [editable, text, initialText, contentRef]);

  const handleChange = (event: FormEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    // If empty, clear out the innerHTML
    if (!target.textContent?.trim().length) {
      target.innerHTML = "";
    }
    onChange(event);
  };

  const sanitizedHTML = DOMPurify.sanitize(editable ? initialText : text || "");

  return (
    <div
      ref={contentRef}
      onInput={handleChange}
      onBlur={handleChange}
      contentEditable={editable}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      {...rest}
    />
  );
});
