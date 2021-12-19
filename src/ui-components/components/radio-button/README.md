# Usage

```sh
import { RadioGroup, RadioButton } from 'ui-components'
  const [value, setValue] = React.useState(1);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  <RadioGroup value={value} onChange={onChange}>
    <RadioButton value={1}>2</RadioButton>
    <RadioButton value={2}>22</RadioButton>
    <RadioButton value={3}>11-22</RadioButton>
  </RadioGroup>

```
