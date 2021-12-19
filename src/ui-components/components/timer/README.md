# Timer component

This component receives a time in future in UNIX-Epoch format and displays remaing day/hour/min/sec to it.

## Usage

```JSX
import {Timer, TimerShowType, TimerElementLabel } from 'ui-components'

const futureEpoch = new Date().getTime() * 1.0005;

<Timer epoch={futureEpoch} />

<Timer epoch={futureEpoch}
       mode={TimerShowType.COLON} />

<Timer epoch={futureEpoch}
       fix={3}/>

<Timer epoch={futureEpoch}
       hideSeconds={true}/>

<Timer epoch={futureEpoch}
       autoCountdown={false}/>

<Timer epoch={futureEpoch}
       labels={[
         TimerElmentLabel.Day,
         TimerElementLabel.Minute
       ]}/>
```

## Props

`epoch` [required Number]

**the future time in unix epoch format**

---

`mode` [optional TimerShowType (default: COLON)]

**indicates the presentation of time in `COLON`, `COMMA`, `BOX` or `CIRCULAR_COLON` style**

---

`fix` [optional Number (default: 2)]

**indicates the minimum number of digits for each element(day, hour, ...) of time**

---

`labels` [optional TimerElementLabel[] (default: Array including all elements)]

**this array indicates which element(s) should appear in presentation**

---

`hideSeconds` [optional Boolean (default: false)]

**indicates whether to show seconds or not**

---

`autoCountdown` [optional Boolean (default: true)]

**indicates whther to start count down automatically after rendering or not.**

---

`size` [optional Number (default: 200)]

**this controls element and font size in CIRCULAR_COLON mode and will set font size according to number of elements in all modes**

---

`description` [optional String]

**give you ability to drop any description below timer**

---

`useCharInstead` [optional String]

**Want to show something else rather than time digits? fill useCharInstead with desired char and it replaces all digits**

---

This components also accepts some HTMLAttributes like className, style, fontName.

className allows you to add your css class to component
style lets you to alter component styles
fontName changes component font.

---
