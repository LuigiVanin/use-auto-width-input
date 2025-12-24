import type { RefObject } from "react";

export type AutWidthInputOptions = {
  minWidth?: string;
  maxWidth?: string;

  ghostElement?: {
    className?: string;
    id?: string;
    styles?: Partial<CSSStyleDeclaration>;
  };
};

export type UseAutoWidthInputReturn = {
  callbackRef: (element: HTMLInputElement | null) => void;
  ref: RefObject<HTMLInputElement | null>;
};
