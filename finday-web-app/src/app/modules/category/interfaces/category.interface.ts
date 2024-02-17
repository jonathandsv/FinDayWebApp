import { LaunchTypeEnum } from "../../../enums/launch.enum";

export interface Category {
    id?: string;
    name?: string;
    description?: string;
    type?: LaunchTypeEnum;
    launchTypeFormated?: string;
}

export interface categoryInput {
    id?: string;
    name: string;
    description: string;
    type: LaunchTypeEnum;
}