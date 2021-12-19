# Time Component

This component takes an unix epoch time and represents it in UTC with specific format

## Usage

```TSX
import { Time } from 'ui-components';

const epoch = new Date().getTime();

<Time epoch={epoch}>
```

## Props

`epoch` [required Number]

**The time we want to show in UTC format**

---

This components also accepts some HTMLAttributes like className, style, fontName.

className allows you to add your css class to component
style lets you to alter component styles
fontName changes component font.

---
