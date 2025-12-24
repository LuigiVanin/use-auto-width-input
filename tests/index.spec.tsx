/* NOTE: Not much testing to be done here, because the dom seems to be bugged when trying to update
         the input content with `addEventListener` native method, so the p ghost tag behavior is 
         not being captured :/. I will maybe test this better with cypress. */
import React, { useRef, useState } from "react";
import { useAutoWidthInput, type AutWidthInputOptions } from "../src";
import { render, screen } from "@testing-library/react";

const AutoWidthInput: React.FC<{
  text?: string;
  options?: AutWidthInputOptions;
}> = ({ text, options }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { callbackRef } = useAutoWidthInput(inputRef, {
    ghostElement: {
      id: "test-ghost-element",
    },
    ...options,
  });

  const [content, setContent] = useState(text || "");

  return (
    <div className="test-box">
      <input
        ref={callbackRef}
        type="text"
        data-testid="auto-width"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
    </div>
  );
};

describe("Testing Hook on render", () => {
  test("input and ghost element presence on the screen", () => {
    render(<AutoWidthInput />);

    const input = screen.getByRole("textbox");
    // Use { hidden: true } to find elements that are not visible to the user
    const paragraph = screen.getByRole("paragraph", { hidden: true });

    expect(input).toBeInTheDocument();
    expect(input).toBeVisible();

    // The min width is not set and there is no default value then the size should be 0
    expect(input.style.width).toBe("0px");
    expect(input.getBoundingClientRect().width).toBe(0);

    expect(paragraph).toBeInTheDocument();
    expect(paragraph).not.toBeVisible();
    expect(paragraph.getBoundingClientRect().width).toBe(0);
  });

  test("input and ghost element with min width options", () => {
    render(<AutoWidthInput options={{ minWidth: "100px" }} />);

    const input = screen.getByRole("textbox");
    expect(input.style.minWidth).toBe("100px");
  });

  test("input and ghost element with max width options", () => {
    render(<AutoWidthInput options={{ maxWidth: "200px" }} />);

    const input = screen.getByRole("textbox");
    expect(input.style.maxWidth).toBe("200px");
  });

  test("input and ghost element with id value", () => {
    render(
      <AutoWidthInput
        options={{ ghostElement: { id: "test-ghost-element-id" } }}
      />
    );

    const paragraph = screen.getByRole("paragraph", { hidden: true });
    expect(paragraph.id).toBe("test-ghost-element-id");
  });

  test("input and ghost element with className value", () => {
    render(
      <AutoWidthInput
        options={{ ghostElement: { className: "test-ghost-element-class" } }}
      />
    );

    const paragraph = screen.getByRole("paragraph", { hidden: true });
    expect(paragraph.classList.contains("test-ghost-element-class")).toBe(true);
  });

  test("input and ghost element with styles value", () => {
    render(
      <AutoWidthInput
        options={{ ghostElement: { styles: { color: "red" } } }}
      />
    );

    const paragraph = screen.getByRole("paragraph", { hidden: true });
    expect(paragraph.style.color).toBe("red");
  });
});
