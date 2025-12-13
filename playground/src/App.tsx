import { useRef, useState } from "react";
import { useAutoWidthInput } from "use-auto-width-input";

function App() {
  const [text, setText] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);

  useAutoWidthInput(inputEl);

  return (
    <div className="test-box flex-center">
      <input
        ref={inputEl}
        value={text}
        onChange={(e) => setText(e.target?.value || "")}
      />
    </div>
  );
}

export default App;
