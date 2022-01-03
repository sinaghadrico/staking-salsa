# Usage

```sh
const onChange = (e: any) => {
setValue(e.target.value);
};
const label1 = <span style={{ color: "#7d8598" }}>Token</span>;
const label2 = <span style={{ color: "#7d8598" }}>Token</span>;
<Input prefix={label1} suffix={label2} value={value} onChange={onChange} />
```
