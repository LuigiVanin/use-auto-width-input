import type { RefObject } from "react";
import type { AutWidthInputOptions } from "./types";

export const applyFontStyles = (
  styles: CSSStyleDeclaration,
  target: HTMLElement
) => {
  target.style.fontFamily = styles.fontFamily;
  target.style.fontSize = styles.fontSize;
  target.style.letterSpacing = styles.letterSpacing;
  target.style.fontWeight = styles.fontWeight;
};

export const applyStyles = (
  styles: Partial<CSSStyleDeclaration>,
  target: HTMLElement
) => {
  Object.keys(styles).forEach((styleAttr: string) => {
    const key = styleAttr as keyof CSSStyleDeclaration;

    const value = styles[key];

    if (typeof value === "string" && typeof key === "string") {
      // target.style.setProperty(key, value);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (target.style as any)[key] = value;
    }
  });
};

export const createGhostElement = (options?: AutWidthInputOptions) => {
  const tempElement = document.createElement("p");

  if (options?.minWidth) {
    tempElement.style.minWidth = options?.minWidth;
  }

  Object.assign(tempElement.style, {
    position: "absolute",
    whiteSpace: "pre",
    top: "0",
    left: "0",
    visibility: "hidden",
    height: "0",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: -1000,
    margin: "0", // Reset margin to avoid layout interference
  });

  tempElement.innerText = "";
  tempElement.setAttribute("class", "ghost-paragraph-element");

  return document.body.appendChild(tempElement);
};

export const syncWidth = (
  inputRef: RefObject<HTMLInputElement | null>,
  ghostElement: RefObject<HTMLElement | null>
) => {
  if (inputRef.current) {
    inputRef.current.style.width = `${
      ghostElement.current?.getBoundingClientRect()?.width ?? 0
    }px`;
    return inputRef.current.style.width;
  }

  return null;
};
