# Button component

This component makes a button

## Usage

```JSX
import { Button, ButtonForm, ButtonWidth } from 'ui-components'

<Button>Click on me</Button>
<Button buttonForm={ButtonForm.PRIMARY}>Click on me</Button>
<Button buttonForm={ButtonForm.SECONDARY} buttonWidth={ButtonWidth.FIT_CONTENT}>Click on me</Button>
```

## Props

`buttonForm` [optional ButtonForm (default: ButtonForm.PRIMARY)]

**ButtonForm specify some default css about button, like, color, background color, text-align**

---

`buttonWidth` [optional ButtonWidth (default: ButtonWidth.FIT_CONTENT)]

**it specifies width of button to react to content or parent**

---

`fontName` [optional string]

**a handy way to determine fontName as props**

---

This components also accepts all other HTMLAttributes like className, style, etc

className allows you to add your css class to component
style lets you to alter component styles

---
