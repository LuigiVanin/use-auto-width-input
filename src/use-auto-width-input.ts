import { useEffect, useRef, useState, type RefObject } from "react";

type AutWidthInputOptions = {
  minWidth?: string;
};

const createGhostTextElement = (
  style: CSSStyleDeclaration,
  options?: AutWidthInputOptions
) => {
  const tmpTextEl = document.createElement("p");

  if (style) {
    tmpTextEl.style.fontFamily = style.fontFamily;
    tmpTextEl.style.fontSize = style.fontSize;
    tmpTextEl.style.letterSpacing = style.letterSpacing;
  }

  if (options?.minWidth) {
    tmpTextEl.style.minWidth = options?.minWidth;
  }

  tmpTextEl.innerText = "";
  tmpTextEl.setAttribute("class", "ghost-paragraph-element");
  tmpTextEl.style.position = "absolute";
  tmpTextEl.style.whiteSpace = "pre";

  return document.body.appendChild(tmpTextEl);
};

const syncInputWidth = (
  inputEl: RefObject<HTMLInputElement | null>,
  ghostTextElement: RefObject<HTMLParagraphElement | null>
) => {
  setTimeout(() => {
    const rect = ghostTextElement.current?.getBoundingClientRect();

    if ((rect?.width !== null || rect?.width !== undefined) && inputEl.current)
      inputEl.current.style.width = `${rect?.width ?? 0}px`;
  });
};

export function useAutoWidthInput(
  inputEl: RefObject<HTMLInputElement | null>,
  options?: AutWidthInputOptions
) {
  const [width] = useState(0);
  const ghostTextElement = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (inputEl.current) {
      const inputStyles = window.getComputedStyle(inputEl.current);
      ghostTextElement.current = createGhostTextElement(inputStyles, options);

      syncInputWidth(inputEl, ghostTextElement);

      inputEl.current.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement;

        if (ghostTextElement.current) {
          ghostTextElement.current.innerText = target.value;

          syncInputWidth(inputEl, ghostTextElement);
        }
      });
    }

    return () => {
      ghostTextElement.current?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputEl]);

  return {
    width,
  };
}
