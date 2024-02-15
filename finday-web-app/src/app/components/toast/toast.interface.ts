import { TemplateRef } from "@angular/core";

export interface Toast {
	template?: TemplateRef<any>;
    message: string; 
	classname?: string;
	delay?: number;
}