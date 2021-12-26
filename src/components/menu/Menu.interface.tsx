export class MenuItem {
    label!: string;
    link?: string;
    target?: string;
}

export interface MenuProps {
    items: MenuItem[];
}
