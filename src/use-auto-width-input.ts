import {
  createElement,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

const createGhostTextElement = () => {
  const tmpTextEl = document.createElement("p");
  tmpTextEl.innerText = "Text Teste";
  tmpTextEl.setAttribute("class", "ghost-paragraph-element");
  tmpTextEl.style.position = "absolute";
  tmpTextEl.style.whiteSpace = "pre";

  return document.body.appendChild(tmpTextEl);
};

export function useAutoWidthInput(inputEl: RefObject<HTMLInputElement | null>) {
  const [width] = useState(0);
  const ghostReflectionText = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (inputEl.current) {
      ghostReflectionText.current = createGhostTextElement();

      inputEl.current.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement;

        if (ghostReflectionText.current) {
          ghostReflectionText.current.innerText = target.value;

          setTimeout(() => {
            const rect = ghostReflectionText.current?.getBoundingClientRect();

            if (rect?.width && inputEl.current) {
              inputEl.current.style.width = `${rect.width}px`;
            }
          });
        }
      });
    }

    return () => {
      ghostReflectionText.current?.remove();
    };
  }, [inputEl]);

  return {
    width,
  };
}
