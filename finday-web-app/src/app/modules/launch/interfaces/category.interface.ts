import { LaunchTypeEnum } from "./launch.interface";

export interface ICategory {
    id?: string;
    name?: string;
    description?: string;
    type?: LaunchTypeEnum;
}