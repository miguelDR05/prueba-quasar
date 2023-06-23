
export interface OptionTable {
  text: string;
  icon: string;
  emit: string;
  color?: string;
  elementCan?: string;
  separator?: boolean;
  children: Array<OptionTable>;
}

