import { useRef, useState } from "react";
import { useAutoWidthInput } from "use-auto-width-input";
import { AutoWidthInput } from "./AutoWidthInput";

const options = {
  minWidth: `100px`,
};

function App() {
  const [text, setText] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);

  const hideInputEl = useRef<HTMLInputElement>(null);
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");

  useAutoWidthInput(inputEl, options);
  useAutoWidthInput(hideInputEl, options);

  const [hide, setHide] = useState(false);

  return (
    <div className="test-box flex-center">
      <input
        ref={inputEl}
        value={text}
        onChange={(e) => setText(e.target?.value || "")}
      />

      <hr />

      {!hide && (
        <input
          ref={hideInputEl}
          value={text2}
          onChange={(e) => setText2(e.target?.value || "")}
        />
      )}

      <button onClick={() => setHide(!hide)}>Hide</button>

      <hr />

      {!hide && (
        <AutoWidthInput
          value={text3}
          onChange={(event) => setText3(event.target.value)}
        />
      )}

      <button onClick={() => setHide(!hide)}>Hide</button>
    </div>
  );
}

export default App;
