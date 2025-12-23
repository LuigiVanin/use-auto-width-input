export type AutWidthInputOptions = {
  minWidth?: string;
  maxWidth?: string;

  ghostElement?: {
    className?: string;
    id?: string;
    styles?: Partial<CSSStyleDeclaration>;
  };
};
