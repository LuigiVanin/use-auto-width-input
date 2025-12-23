import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import type { AutWidthInputOptions } from "./types";
import {
  applyFontStyles,
  applyStyles,
  createGhostElement,
  syncWidth,
} from "./helpers";

type UseAutoWidthInputReturn = {
  width: string | number;
  callbackRef: (element: HTMLInputElement | null) => void;
  ref: RefObject<HTMLInputElement | null>;
};

// export function useAutoWidthInput(
//   inputRef: RefObject<HTMLInputElement | null>,
//   options?: AutWidthInputOptions
// ): UseAutoWidthInputReturn;

// export function useAutoWidthInput(
//   options?: AutWidthInputOptions
// ): UseAutoWidthInputReturn;

export function useAutoWidthInput(
  inputRef: RefObject<HTMLInputElement | null>,
  options?: AutWidthInputOptions
): UseAutoWidthInputReturn {
  const [width, setWidth] = useState(options?.minWidth ?? 0);
  const ghostElement = useRef<HTMLElement>(null);
  const input = inputRef.current;

  const syncWidthToState = (
    inputRef: RefObject<HTMLInputElement | null>,
    ghostElement: RefObject<HTMLElement | null>
  ) => {
    const currentWidth = syncWidth(inputRef, ghostElement);
    if (currentWidth) setWidth(currentWidth);
  };

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (ghostElement.current) {
      ghostElement.current.innerText = target.value;

      syncWidthToState(inputRef, ghostElement);
    }
  };

  const destroy = () => {
    input?.removeEventListener("input", handleInput);
    ghostElement.current?.remove();
    ghostElement.current = null;
  };

  const mountBehaviour = () => {
    if (!inputRef.current) return;

    const styles = window.getComputedStyle(inputRef.current);
    ghostElement.current = createGhostElement(options);

    ghostElement.current.innerText = inputRef.current.value;

    if (options?.minWidth) inputRef.current.style.minWidth = options?.minWidth;
    if (options?.maxWidth) inputRef.current.style.maxWidth = options?.maxWidth;

    applyFontStyles(styles, ghostElement.current);

    // Here I allow you to mess up the styles of the hidden element
    if (options?.ghostElement?.styles)
      // NOTE: this will overwrite anything from the previus `applyFontStyles`
      applyStyles(options?.ghostElement?.styles, ghostElement.current);

    syncWidthToState(inputRef, ghostElement);

    inputRef.current.addEventListener("input", handleInput);
  };

  useEffect(
    () => {
      mountBehaviour();

      return () => destroy();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const callbackRef = useCallback(
    (element: HTMLInputElement | null) => {
      inputRef.current = element;

      if (!element) destroy();
      else if (element && inputRef.current) {
        mountBehaviour();
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
