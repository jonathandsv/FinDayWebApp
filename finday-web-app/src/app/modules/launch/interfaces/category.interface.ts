import { LaunchTypeEnum } from "./launch.interface";

export interface Category {
    id?: string;
    name?: string;
    description?: string;
    type?: LaunchTypeEnum;
}