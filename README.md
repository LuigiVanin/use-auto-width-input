# use-auto-width-input

A lightweight React hook that automatically adjusts input width based on content.

> ![warning] This is a working in progress library and more features will be added in the future, like: more customization via `Option` parameter and function overloading for multiple parameters, giving the hook more flexibility.

## Installation

```bash
npm install use-auto-width-input
# or
yarn add use-auto-width-input
# or
bun add use-auto-width-input
```

## Usage

```tsx
import { useRef } from 'react';
import { useAutoWidthInput } from 'use-auto-width-input';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { callbackRef } = useAutoWidthInput(inputRef);
  
  return (
    <input 
      ref={callbackRef}
      type="text"
      placeholder="Type something..."
      style={{ minWidth: "50px", maxWidth: "480px" }}
    />
  );
}
```

## API

### `useAutoWidthInput(inputRef, options?)`

#### Parameters

- `inputRef`: A React ref object for the input element
- `options` (optional):
  - `minWidth?: string` - Minimum width for the input

#### Returns

- `callbackRef`: Callback ref to attach to the input element
- `width`: Current width value
- `ref`: The original input ref

## How It Works

The hook creates an invisible "ghost" element that mirrors the input's text and font styles. As you type, it measures the ghost element's width and dynamically applies it to the actual input, creating a seamless auto-sizing effect.

## Controlling Width Constraints

You can easily control the minimum and maximum width by applying standard CSS styles directly to your input element:

```tsx
<input 
  ref={callbackRef}
  style={{ 
    minWidth: "100px",  // Won't shrink below this
    maxWidth: "500px"   // Won't grow beyond this
  }}
/>
```

This gives you full control over the input's width boundaries without needing additional hook configuration.

## License

MIT