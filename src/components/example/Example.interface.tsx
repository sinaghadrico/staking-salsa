import { Example } from "models/example";

export interface ExampleProps {
    inputPropEX?: Example;
    onOutputPropEX?: () => void;
    children?: React.ReactNode;
}
