# Usage

```sh
import { Tabs, Tab, TabPanel, Paper } from 'ui-components'

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

      <Tabs hasBorder={true} value={value} onChange={handleChange}>
        <Tab>Token</Tab>
        <Tab>RoadMap</Tab>
        <Tab>Team & Investors</Tab>
      </Tabs>
      <TabPanel value={value} index={0}>
        this is one
      </TabPanel>
      <TabPanel value={value} index={1}>
        this is two
      </TabPanel>
      <TabPanel value={value} index={2}>
        this is three
      </TabPanel>

```
