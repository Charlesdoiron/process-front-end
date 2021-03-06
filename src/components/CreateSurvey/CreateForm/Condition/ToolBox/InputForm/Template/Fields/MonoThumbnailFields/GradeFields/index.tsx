import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import IQuestion from "types/form/question";
import { Input, NumberInput, Textarea } from "components/Fields";
import { RepeatedFields } from "../../..";
import { useFormikContext } from "formik";

const ID = "mono_thumbnail_input";
interface Props {
  selectedQuestion: IQuestion;
}

export const GradeFields: React.FC<Props> = ({ selectedQuestion }) => {
  const { setFieldValue, handleReset, resetForm } = useFormikContext();

  useEffect(() => {
    const savedType = selectedQuestion.mono_thumbnail_input?.type;
    if (savedType) {
      console.log(savedType);
      handleReset();
      resetForm({ values: "" });
      setFieldValue("mono_thumbnail_input.type", savedType);
      // setFieldValue("mono_thumbnail_input.label", "");
    }
  }, [selectedQuestion.mono_thumbnail_input?.type]);

  return (
    <Box mt="5">
      <Textarea
        isCollapsed={false}
        rows="small"
        label="Label de la question"
        placeholder="Ex: Noter cette proposition de 0 à 10"
        id={`${ID}.label`}
        isRequired={true}
      />
      {renderTemplate(selectedQuestion)}
    </Box>
  );
};

const renderTemplate = (selectedQuestion: IQuestion) => {
  switch (selectedQuestion?.mono_thumbnail_input?.type) {
    case "number_input":
      return (
        <Flex justifyContent="space-between">
          <NumberInput
            style={{ width: "45%" }}
            label="Valeur minimale"
            name={`${ID}.min`}
            isCollapsed={false}
            placeholder="Ex:0"
          />
          <NumberInput
            style={{ width: "45%" }}
            label="Valeur maximale"
            name={`${ID}.max`}
            isCollapsed={false}
            placeholder="Ex:10"
          />
        </Flex>
      );
      break;
    case "slider":
      return (
        <Box>
          <Flex justifyContent="space-between" w="100%">
            <Box w="45%">
              <Input
                type="number"
                isRequired
                label="Valeur minimale"
                name={`${ID}.min`}
                isCollapsed={false}
                placeholder="1"
              />
            </Box>
            <Box w="45%">
              <Input
                type="number"
                isRequired
                label="Valeur maximale"
                name={`${ID}.max`}
                isCollapsed={false}
                placeholder="1"
              />
            </Box>
          </Flex>
          <Flex justifyContent="space-between" w="100%" mb={5}>
            <Box w="45%">
              <Input
                type="number"
                isRequired
                label="Intervalles entre deux graduations"
                name={`${ID}.step`}
                isCollapsed={false}
                placeholder="1"
              />
            </Box>
          </Flex>
        </Box>
      );
      break;
    case "radio":
      return <RepeatedFields name={`${ID}.options`} />;
      break;
    default:
      break;
  }
};
