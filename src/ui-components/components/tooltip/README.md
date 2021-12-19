# Tooltip component

This component makes a tooltip with title? and description

## Usage

```JSX
import { Tooltip, TooltipPosition } from 'ui-components'

<Tooltip description="some description">
<Tooltip title="TITLE" description="some description">
<Tooltip title="TITLE" description="some description" pointTo={50}>
<Tooltip title="TITLE" description="some description" position={TooltipPosition.UP}>
<Tooltip title="TITLE" description="some description" position={TooltipPosition.DOWN}>
```

## Props

`title` [optional string]

**a block for title of tooltip with bigger font**

---

`description` [required string]

**a text with smaller font size for explain in more details**

---

`position` [optional TooltipPosition (default: TooltipPosition.UP)]

**indicates the place for tooltip, where could be above(UP), down, right or left. (Right and Left could have some issues)**

---

`pointTo` [optional Number (in range of [0, 100] )]

**indicates the position of Tooltip dangle using percent**

---

`icon` [optional TooltipIconType (default: TooltipIconType.INFO)]

**use rounded icon with svg based on TooltipIconType for tooltip-without-children**

---

`offset` [optional Number (default: 0)]

**offset from pointTo in order to move it to right/left**

---

`offsetTop` [optional Number (default: 0)]

**offset from top position, in order to make it upper or downer?**

---

This components also accepts some HTMLAttributes like className, style, fontName.

className allows you to add your css class to component
style lets you to alter component styles
fontName changes component font.

---
