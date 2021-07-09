import { Box } from "@chakra-ui/react";
import {
  Input,
  NumberInput,
  Checkbox,
  Radiobox,
  Select,
  Slider,
  Datepicker,
  Textarea,
} from "components/Fields";
import IQuestion from "interfaces/form/question";
import React from "react";
import { useAppSelector } from "redux/hooks";

import { t } from "static/input";

interface Options {
  value: string | undefined;
  label: string | undefined;
}

export const renderInput = (input: IQuestion): React.ReactNode => {
  const isCollapsed = useAppSelector(
    (state) => state.formBuilder.is_collapse_view
  );
  const formatOptions = (): Options[] | undefined => {
    if (input.answers) {
      console.log(input.answers);
      const arr = [];
      for (const [, value] of Object.entries(input.answers)) {
        if (value !== null) {
          console.log(value);
          arr.push({ value, label: value });
        }
      }
      return arr;
    }
  };
  switch (input.type) {
    case "input":
      return (
        <>
          <Input
            isCollapsed={isCollapsed}
            isRequired={input.required}
            name={input.id || "input"}
            min_length={input.min_length}
            max_length={input.max_length}
            type="text"
            label={input.label || t.label}
            helpText={input.help_text || t.help_text}
            placeholder={input.placeholder || t.placeholder}
            inputRightAddon={input.units}
          />
        </>
      );
      break;
    case "number_input":
      return (
        <NumberInput
          isCollapsed={isCollapsed}
          isRequired={input.required}
          placeholder={input.placeholder || t.placeholder}
          name={input.id || "number_input"}
          precision={4}
          label={input.label || t.label}
          helpText={input.help_text || t.help_text}
        />
      );
      break;
    case "checkbox":
      return (
        <Checkbox
          isCollapsed={isCollapsed}
          id={input.id || "checkbox"}
          isRequired={input.required}
          label={input.label || t.label}
          helpText={input.help_text || t.help_text}
          checkbox={formatOptions()}
        />
      );
      break;
    case "radio":
      return (
        <Radiobox
          helpText={input.help_text || t.help_text}
          isCollapsed={isCollapsed}
          isRequired={input.required}
          id={input.id || "radiobox"}
          label={input.label || t.label}
          radios={formatOptions()}
        />
      );
      break;
    case "select":
      return (
        <Select
          isCollapsed={isCollapsed}
          id={input.id || "select"}
          label={input.label || t.label}
          placeholder={input.placeholder || t.placeholder}
          answers={formatOptions()}
          helpText={input.help_text || t.help_text}
        />
      );
      break;
    case "slider":
      return (
        <Slider
          isCollapsed={isCollapsed}
          isRequired={input.required}
          id={input.id || "slider"}
          label={input.label || t.label}
          min={input.min}
          max={input.max}
          step={input.step}
          defaultValue={input.default_value}
          helpText={input.help_text || t.help_text}
          vertical={input.vertical}
          reverse={input.reverse}
        />
      );
      break;
    case "text_area":
      return (
        <Textarea
          isCollapsed={isCollapsed}
          isRequired={input.required}
          id={input.id || "textarea"}
          rows={input.rows}
          label={input.label || t.label}
          placeholder={input.placeholder || t.placeholder}
          helpText={input.help_text || t.help_text}
        />
      );
      break;
    case "date_picker":
      return (
        <Datepicker
          isCollapsed={isCollapsed}
          isRequired={input.required}
          label={input.label || t.label}
          id={input.id || "datepicker"}
          helpText={input.help_text || t.help_text}
        />
      );
      break;

    case "wysiwyg":
      return (
        <Box
          textAlign="left"
          id={input.id || "wysiwyg"}
          dangerouslySetInnerHTML={{
            __html: input.wysiwyg === undefined ? "" : input.wysiwyg,
          }}
        />
      );
    case "free_classification":
      return (
        <Textarea
          isCollapsed={isCollapsed}
          isRequired={input.required}
          id={input.id || "free_classification"}
          rows={input.rows}
          label={input.label || t.label}
          placeholder={input.placeholder || t.placeholder}
          helpText={input.help_text || t.help_text}
        />
      );
    default:
      return false;
      break;
  }
};
