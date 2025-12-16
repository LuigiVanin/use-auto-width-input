## WIP

```tsx
const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { callbackRef, width } = useAutoWidthInput(inputRef);
  
  return (
    <input 
      ref={callbackRef} 
      type="text"
      style={{ minWidth: "50px", maxWidth: "480px" }}
    />
  )
}
```