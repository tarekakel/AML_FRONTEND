// models/action.model.ts
export interface Action {
    id: number;
    name: string;
    code: string;
}

// models/menu-item.model.ts
export interface MenuItem {
    id: number;
    name: string;
    path: string;
    parent: number | null;
    order: number;
    icon: string;
    actions: Action[];
    children?: MenuItem[];
}
