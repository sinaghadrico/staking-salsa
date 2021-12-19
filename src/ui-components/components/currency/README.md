# Currency component

This component represents Currency values, including unit and formatting

## Usage

```JSX
import { Currency, CurrencyUnit, useCurrency } from 'ui-components'

const {format, makeRaw} = useCurrency();

<Currency value={2500}/>
<Currency value="42600" unit={CurrencyUnit.DOLLAR}/>
<Currency value="42600" unit={CurrencyUnit.DOLLAR} decimal={2}/>

format(value: 1200, decimal: 2); // => 1,200.00
format(value: 2500); // => 2,500
makeRaw(value: 42000, unit: CurrencyUnit.USD, decimal: 1); // 42,000.0 USD
```

## Props

`value` [required string|number]

**value is the amount of currency we want to show. just the value without unit and any format in string or number**

---

`unit` [required CurrencyUnit]

**Unit for representing value as USD, TOTM, BTC, DOLLAR($) or NONE('')**

---

`size` [optional string (default: '14px')]

**specifies font size for representing component**

---

`color` [optional string (default: 'white')]

**sets color of component**

---

`decimal` [optional number (default: 0)]

**specifies number of float point in representing, so $1200, $1200.0, $1200.00 by setting 0, 1 or 2 and son on**

---

This components also accepts some HTMLAttributes like className, style, fontName.

className allows you to add your css class to component
style lets you to alter component styles
fontName changes component font.

---
