export interface RadioProps {
    value: number;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent) => any;
    children?: React.ReactNode;
    [x: string]: any;
    theme?: string;
}
