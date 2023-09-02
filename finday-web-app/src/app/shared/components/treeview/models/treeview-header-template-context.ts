import { TreeviewConfig } from "./treeview-config";
import { TreeviewItem } from "./treeview-item";

export interface TreeviewHeaderTemplateContext {
  config: TreeviewConfig;
  item: TreeviewItem;
  onCollapseExpand: () => void;
  onCheckedChange: (checked: boolean) => void;
  onFilterTextChange: (text: string) => void;
}
