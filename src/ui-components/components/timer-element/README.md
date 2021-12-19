# TimerElement component

This component receives a portion of time (day, hour, minute, second) and shows that as well

## Usage

```JSX
import { TimerElement, TimerShowType, TimerElementLabel } from 'ui-components'


<TimerElement name={TimerElementLabel.DAY} value={23} mode={TimerShowType.BOX} fix={2} />
```

## Props

`name` [required TimerElementLabel]

**name of portion of time, eg day**

---

`value` [required Number]

**represented value for element specified by name**

---

`mode` [required TimerShowType]

**indicates style of timer, whether to be a box, linear or etc.**

---

`fix` [required number]

**how long should be the value. 23, 023, 0023 for fix = 2, 3, 4. It will prefixed value to meet length of fix**

---

This components also accepts some HTMLAttributes like className, style, fontName.

className allows you to add your css class to component
style lets you to alter component styles
fontName changes component font.

---
