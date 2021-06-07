import IInput from "./input";
import IOperator from "./operator";

export default interface ICondition {
  id: string | undefined;
  condition_type: "page" | "input";
  referer_entity_id: string;
  selected_question?: IInput;
  operator?: IOperator;
  target_value?: string | number;
  step?: 1 | 2 | 3;
  group: number;
}