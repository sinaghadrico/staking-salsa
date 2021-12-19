# Loading component

This component is an orange spinner

## Usage

```TSX
import { Loading } from 'ui-components';

<Loading />

<Loading size={200} thickness='7px' />

<Loading size={200} thickness='7px'>
  <p>Hello World!</p>
</Loading>

```

## Props

`size` [optional Number (default: 200)]

**indicates the diameter of circle that spins**

---

`thickness` [optional String (default: '7px')]

**indicates the thickness of orange spinner**

---

`NOTE that children of loading component placed in the middle of loading, both horizontally and vertically, maybe need some width/height modification for children`

---

This components also accepts some HTMLAttributes like className, style, fontName.

className allows you to add your css class to component
style lets you to alter component styles
fontName changes component font.

---
