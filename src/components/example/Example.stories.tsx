import { ComponentStory, ComponentMeta } from "@storybook/react";

import Example from "./Example";

export default {
    title: "Example/Example",
    component: Example,
} as ComponentMeta<typeof Example>;

const Template: ComponentStory<typeof Example> = (args) => <Example {...args} />;

export const ExampleProps = Template.bind({});
ExampleProps.args = {
    inputPropEX: { title: "Example Title", description: "Example Description" },
};
