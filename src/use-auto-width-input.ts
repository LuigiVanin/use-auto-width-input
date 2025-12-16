import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import type { AutWidthInputOptions } from "./types";
import { applyFontStyles, createGhostElement, syncWidth } from "./helpers";

export function useAutoWidthInput(
  inputRef: RefObject<HTMLInputElement | null>,
  options?: AutWidthInputOptions
) {
  const [width] = useState(options?.minWidth ?? 0);
  const ghostElement = useRef<HTMLElement>(null);
  const input = inputRef.current;

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (ghostElement.current) {
      ghostElement.current.innerText = target.value;

      syncWidth(inputRef, ghostElement);
    }
  };

  const destroy = () => {
    input?.removeEventListener("input", handleInput);
    ghostElement.current?.remove();
    ghostElement.current = null;
  };

  useEffect(
    () => () => destroy(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const callbackRef = useCallback(
    (element: HTMLInputElement | null) => {
      inputRef.current = element;

      if (!element) destroy();
      else if (element && inputRef.current) {
        const styles = window.getComputedStyle(inputRef.current);
        ghostElement.current = createGhostElement(options);

        ghostElement.current.innerText = inputRef.current.value;
        applyFontStyles(styles, ghostElement.current);
        syncWidth(inputRef, ghostElement);

        inputRef.current.addEventListener("input", handleInput);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputRef]
  );

  return {
    width,
    callbackRef,
    ref: inputRef,
  };
}
