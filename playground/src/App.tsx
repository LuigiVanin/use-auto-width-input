import { useRef, useState } from "react";
import { useAutoWidthInput } from "use-auto-width-input";
import { AutoWidthInput } from "./AutoWidthInput";

const options = {
  minWidth: `125px`,
};

function App() {
  const [text, setText] = useState("Teste");
  const inputEl = useRef<HTMLInputElement>(null);
  const { callbackRef: ref1 } = useAutoWidthInput(inputEl, options);

  const hideInputEl = useRef<HTMLInputElement>(null);
  const [hide1, setHide1] = useState(false);
  const [text2, setText2] = useState("");
  const { callbackRef: ref2 } = useAutoWidthInput(hideInputEl, {
    minWidth: `90px`,
    maxWidth: "200px",
    ghostElement: {
      id: "testid",
      className: "class-test",
      styles: {
        color: "blue",
      },
    },
  });

  const [hide2, setHide2] = useState(false);
  const [text3, setText3] = useState("");

  const { callbackRef: ref4 } = useAutoWidthInput();
  const [text4, setText4] = useState("");

  const { callbackRef: ref5 } = useAutoWidthInput({
    minWidth: "100px",
    maxWidth: "300px",
    ghostElement: {
      id: "testid",
      className: "class-test",
      styles: {
        color: "#ff0000",
      },
    },
  });
  const [text5, setText5] = useState("");

  return (
    <div className="test-box flex-center">
      <input
        ref={ref1}
        className="target-input"
        value={text}
        onChange={(e) => setText(e.target?.value || "")}
      />

      <hr />

      {!hide1 && (
        <input
          ref={ref2}
          value={text2}
          onChange={(e) => setText2(e.target?.value || "")}
        />
      )}

      <button onClick={() => setHide1(!hide1)}>Hide</button>

      <hr />

      {!hide2 && (
        <AutoWidthInput
          value={text3}
          onChange={(event) => setText3(event.target.value)}
        />
      )}

      <button onClick={() => setHide2(!hide2)}>Hide</button>

      <hr />

      <input
        ref={ref4}
        value={text4}
        onChange={(event) => setText4(event.target.value)}
      />

      <hr />

      <input
        ref={ref5}
        value={text5}
        onChange={(event) => setText5(event.target.value)}
      />
    </div>
  );
}

export default App;
