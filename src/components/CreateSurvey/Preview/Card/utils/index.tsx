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
import Inputs from "interfaces/inputs";
import React from "react";

import t from "static/input.json";

interface Options {
  value: string | undefined;
  label: string | undefined;
}

export const renderInput = (input: Inputs): React.ReactNode => {
  const formatOptions = (): Options[] | undefined => {
    if (input.options) {
      const arr = [];
      for (const [, value] of Object.entries(input.options)) {
        arr.push({ value, label: value });
      }
      return arr;
    }
  };
  console.log("FO", input.options);
  console.log(formatOptions());
  switch (input.type) {
    case "input":
      return (
        <>
          <Input
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
    case "number-input":
      return (
        <NumberInput
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
          label={input.label || t.label}
          helpText={input.help_text || t.help_text}
          checkbox={formatOptions()}
        />
      );
      break;
    case "radio":
      return (
        <Radiobox
          id={input.id || "radiobox"}
          label={input.label || t.label}
          radios={formatOptions()}
        />
      );
      break;
    case "select":
      return (
        <Select
          id={input.id || "select"}
          label={input.label || t.label}
          placeholder={input.placeholder || t.placeholder}
          options={formatOptions()}
          helpText={input.help_text || t.help_text}
        />
      );
      break;
    case "slider":
      return (
        <Slider
          id={input.id || "slider"}
          label={input.label || t.label}
          min={input.min}
          max={input.max}
          step={1}
          defaultValue={2}
          helpText={input.help_text || t.help_text}
          vertical={input.orientation}
        />
      );
      break;
    case "text-area":
      return (
        <Textarea
          id={input.id || "textarea"}
          rows={input.rows}
          label={input.label || t.label}
          placeholder={input.placeholder || t.placeholder}
        />
      );
      break;
    case "date-picker":
      return (
        <Datepicker
          label={input.label || t.label}
          id={input.id || "datepicker"}
        />
      );
      break;

    default:
      return false;
      break;
  }
};
