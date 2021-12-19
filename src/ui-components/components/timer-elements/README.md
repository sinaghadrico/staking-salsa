# TimerElements component

TimerElements is a container for all elements (TimerElement) of time

## Usage

```JSX
import { TimerElement, TimerShowType, TimerElementLabel } from 'ui-components'


<TimerElements
    elements={{ day: 23, hour: 7, minute: 37, second: 12 }} mode={TimerShowType.BOX}
    fix={2} labels={[TimerElementLabel.Day, TimerElementLabel.Hour]}
    visibility={'visible'} description={'some explains...'}
    />
```

## Props

`elements` [required Object]

**Object contains elements to show in timer**

---

`mode` [required TimerShowType]

**indicates style of timer, whether to be a box, linear or etc.**

---

`labels` [required Array<TimerElementLabel>]

**An array of labels filtering elements to show or not**

---

`fix` [required number]

**how long should be the value. 23, 023, 0023 for fix = 2, 3, 4. It will prefixed value to meet length of fix**

---

`visibility` [required string]

**CSS visibility value for elements**

---

`description` [optional string]

**drop an description below timer to explain what it shows...**

---

This components also accepts some HTMLAttributes like className, style, fontName.

className allows you to add your css class to component
style lets you to alter component styles
fontName changes component font.

---
