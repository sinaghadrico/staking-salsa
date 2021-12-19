import { ButtonHTMLAttributes } from "react";
import { ButtonForm, ButtonWidth } from "./Button.enum";

export interface ButtonProps extends ButtonHTMLAttributes<any> {
    readonly buttonForm?: ButtonForm;
    readonly width?: ButtonWidth;
    readonly fontName?: string;
    theme?: string;
}
