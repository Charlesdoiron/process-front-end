import ICondition from "./condition";

export default interface IQuestion {
  type:
    | "input"
    | "wysiwyg"
    | "text-area"
    | "select"
    | "slider"
    | "number_input"
    | "radio"
    | "checkbox"
    | "date_picker"
    | "free_classification";
  name: string;
  id: string;
  label?: string;
  placeholder?: string;
  help_text?: string;
  internal_title?: string;
  internal_description?: string;
  min_length?: string;
  max_length?: string;
  units?: string;
  vertical?: boolean;
  reverse?: boolean;
  answers?: string[];
  min?: string;
  max?: string;
  step?: string;
  rows?: "small" | "medium" | "large" | undefined;
  required?: boolean;
  default_value?: string | undefined;
  page?: string;
  wysiwyg?: string | undefined;
  freeclassification_responses_count?: string;
  condition?: ICondition["id"][];
}
