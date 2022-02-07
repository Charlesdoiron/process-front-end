import React, { ReactElement, useEffect } from "react";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { t } from "static/survey";
import { useField } from "formik";
import Select from "react-select";

interface Props {
  label: string;
  id: string;
  placeholder?: string;
  helpText?: string;
  answers: Options[] | undefined;
  isRequired?: any;
  isMulti?: boolean;
  isCollapsed?: boolean;
  defaultValue?: string;
}

interface IProvided {
  provided: Record<string, unknown>;
}

const customStyles: Record<string, unknown> = {
  option: (provided: IProvided) => ({
    ...provided,
    padding: "10px",
    fontSize: "12px",
  }),

  input: (provided: IProvided) => ({
    ...provided,

    fontSize: "12px",
  }),
  placeholder: (provided: IProvided) => ({
    ...provided,
    color: "gray",
    fontSize: "12px",
  }),
  singleValue: (provided: IProvided) => ({
    ...provided,

    fontSize: "12px",
  }),
  noOptionsMessage: (provided: IProvided) => ({
    ...provided,

    fontSize: "12px",
  }),
  container: (provided: IProvided) => ({
    ...provided,

    padding: 0,
  }),
  valueContainer: (provided: IProvided) => ({
    ...provided,
    height: "40px",
  }),
};

export const CustomSelect: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  isRequired,
  id,
  answers,
  isCollapsed,
  isMulti = false,
  defaultValue,
}): ReactElement => {
  const [field, , helpers] = useField(id);
  const { setValue } = helpers;

  useEffect(() => {
    if (defaultValue && !field.value) {
      setValue(defaultValue);
    }
  }, []);
  const getLabel = () => {
    if (!answers) return;
    const selected = answers.find((answer) => answer.value === field.value);
    return selected?.label;
  };

  return (
    <FormControl id={id} textAlign="left" isRequired={isRequired === "true"}>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <Select
            isMulti={isMulti}
            styles={customStyles}
            id={id}
            isRequired={isRequired === "true"}
            placeholder={placeholder}
            noOptionsMessage={() => t.not_found}
            options={answers}
            onChange={(option) => setValue(option.value)}
            defaultValue={field.value}
            value={{ label: getLabel(), value: field.value }}
          />
          <FormHelperText fontSize="xs">{helpText}</FormHelperText>
        </>
      )}
    </FormControl>
  );
};
