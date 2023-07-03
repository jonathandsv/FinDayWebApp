import { IFilter } from "src/app/core/interfaces/filter.interface";
import { LaunchTypeEnum } from "../enums/launch.enum";

export interface ILaunchFilter extends IFilter {

}

export interface ILaunchInput {
    Description: string;
    IsInstallment: boolean;
    LaunchDate: Date;
    Value: number;
    UserId: string;
    CategoryId: string;
}

export interface Launch {
    description: string;
    isInstallment: boolean;
    launchDate: Date;
    value: number;
    category: Category;
}

export interface Category {
    id: string;
    description: string;
    type: LaunchTypeEnum;
    typeDescription: string;
}