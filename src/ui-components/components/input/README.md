# Usage

```sh
const onChange = (e: any) => {
setValue(e.target.value);
};
const label1 = <span style={{ color: "#7d8598" }}>TST</span>;
const label2 = <span style={{ color: "#7d8598" }}>TST</span>;
<Input prefix={label1} suffix={label2} value={value} onChange={onChange} />
```
