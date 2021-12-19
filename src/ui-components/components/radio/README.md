# Usage

```sh
import { RadioGroup, Radio } from 'ui-components'
  const [value, setValue] = React.useState(1);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
    <RadioGroup value={value} onChange={onChange}>
      <Radio value={1}>
        <div>
          <p>test</p>
        </div>
      </Radio>
      <Radio value={2}>two</Radio>
      <Radio value={3}>three</Radio>
    </RadioGroup>

```
