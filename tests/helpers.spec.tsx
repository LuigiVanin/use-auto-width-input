import { describe, test, expect, vi, afterEach } from "vitest";
import {
  applyFontStyles,
  applyStyles,
  createGhostElement,
  syncWidth,
} from "../src/helpers";

describe("Helpers", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("applyFontStyles", () => {
    test("copies font styles from source to target", () => {
      const sourceStyles = {
        fontFamily: "Arial",
        fontSize: "16px",
        letterSpacing: "1px",
        fontWeight: "bold",
      } as CSSStyleDeclaration;

      const target = document.createElement("div");
      applyFontStyles(sourceStyles, target);

      expect(target.style.fontFamily).toBe("Arial");
      expect(target.style.fontSize).toBe("16px");
      expect(target.style.letterSpacing).toBe("1px");
      expect(target.style.fontWeight).toBe("bold");
    });
  });

  describe("applyStyles", () => {
    test("applies partial styles to target element", () => {
      const styles = {
        color: "red",
        backgroundColor: "blue",
        marginTop: "10px",
      };

      const target = document.createElement("div");
      applyStyles(styles, target);

      expect(target.style.color).toBe("red");
      expect(target.style.backgroundColor).toBe("blue");
      expect(target.style.marginTop).toBe("10px");
    });
  });

  describe("createGhostElement", () => {
    test("creates a paragraph element appended to body with default styles", () => {
      const element = createGhostElement();

      expect(document.body.contains(element)).toBe(true);
      expect(element.tagName).toBe("P");
      expect(element.className).toBe("ghost-paragraph-element");
      expect(element.style.position).toBe("absolute");
      expect(element.style.visibility).toBe("hidden");
      expect(element.style.height).toBe("0px");
      expect(element.style.overflow).toBe("hidden");
      expect(element.style.pointerEvents).toBe("none");
      expect(element.style.zIndex).toBe("-1000");
    });

    test("applies minWidth if provided in options", () => {
      const element = createGhostElement({ minWidth: "50px" });
      expect(element.style.minWidth).toBe("50px");
    });
  });

  describe("syncWidth", () => {
    test("sets input width based on ghost element width", () => {
      const input = document.createElement("input");
      const ghost = document.createElement("p");

      // Mock getBoundingClientRect for the ghost element
      vi.spyOn(ghost, "getBoundingClientRect").mockReturnValue({
        width: 120,
        height: 20,
        top: 0,
        left: 0,
        right: 120,
        bottom: 20,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      const inputRef = { current: input };
      const ghostRef = { current: ghost };

      syncWidth(inputRef, ghostRef);

      expect(input.style.width).toBe("120px");
    });

    test("returns null if input ref is null", () => {
      const ghost = document.createElement("p");
      const ghostRef = { current: ghost };
      const inputRef = { current: null };

      const result = syncWidth(inputRef, ghostRef);
      expect(result).toBeNull();
    });

    test("handles case where ghost element is null (defaults to 0px)", () => {
      const input = document.createElement("input");
      const inputRef = { current: input };
      const ghostRef = { current: null };

      syncWidth(inputRef, ghostRef);

      expect(input.style.width).toBe("0px");
    });
  });
});
