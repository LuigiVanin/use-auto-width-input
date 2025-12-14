import { useRef, type ChangeEvent } from "react";
import type React from "react";
import { useAutoWidthInput } from "use-auto-width-input";

type InputProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const AutoWidthInput: React.FC<InputProps> = (props) => {
  const inputEl = useRef<HTMLInputElement>(null);

  useAutoWidthInput(inputEl, {
    // minWidth: "60px",
  });

  return (
    <input
      ref={inputEl}
      type="text"
      value={props.value}
      style={{ minWidth: "50px" }}
      onChange={props.onChange}
    />
  );
};
