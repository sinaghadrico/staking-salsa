import { ColorType } from "./ColorType.enum";
export interface LabelProps {
    children?: React.ReactNode;
    size?: string;
    label?: string;
    color?: ColorType | string;
    filled?: boolean;
    style?: object;
    className?: string;
}
