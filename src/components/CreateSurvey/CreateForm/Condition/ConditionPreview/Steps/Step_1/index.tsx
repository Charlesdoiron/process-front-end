import React from "react";

import { Container, Text } from "@chakra-ui/react";
import { useAppSelector } from "redux/hooks";

import IQuestion from "interfaces/form/question";
import ICondition from "interfaces/form/condition";
import { authorizedInputTypes } from "./utils";
import { t } from "static/input";
import { InputBox } from "components/CreateSurvey/CreateForm/InputsPreview/InputBox";
import { useGetQuestions } from "api/actions/question";
import { useUpdateCondition } from "api/actions/condition";
import { useGetSurvey } from "api/actions/survey";

interface Props {
  currentCondition: ICondition | undefined;
}

export const Step_1: React.FC<Props> = ({ currentCondition }) => {
  const { mutateAsync: updateCondition } = useUpdateCondition(
    currentCondition?.id
  );
  const { selected_input, selected_page } = useAppSelector(
    (state) => state.formBuilder
  );
  const { data } = useGetQuestions({
    page_id: selected_page.id,
  });

  const dev_survey = "60e2e9107fa4044c102a881a";
  const { data: survey } = useGetSurvey({ id: dev_survey });

  const refererType =
    currentCondition?.type === "page"
      ? currentCondition?.referer_page?.id
      : currentCondition?.referer_question?.id;

  const currentInputIndex = refererType;
  const inputOrder = survey?.survey.order;
  console.log(currentInputIndex);

  const inputsBeforeCurrent = inputOrder.slice(0, currentInputIndex);

  // Remove all types who can't be conditionable, remove the selected input, remove input after the selected one.
  const authorizedInputs = data.questions
    .filter((i: IQuestion) => authorizedInputTypes.includes(i.type))
    .filter((i: IQuestion) => i.id !== selected_input.id)
    .filter((i: IQuestion) => i.id && inputsBeforeCurrent.includes(i.id));

  const isEmpty = authorizedInputs.length === 0;

  const renderCard = (input: IQuestion) => {
    // const target_question = getInputById(selected_condition.target_id);
    const isSelected = input.id === currentCondition?.target?.id;
    return (
      <InputBox
        key={input.id}
        isSelected={isSelected}
        input={input}
        onClick={() =>
          updateCondition({
            id: currentCondition?.id,
            data: {
              target: input.id,
            },
          })
        }
      />
    );
  };

  console.log("questions list", data);

  return (
    <Container w="100%" maxW="unset" p={0}>
      {!isEmpty && (
        <Text textAlign="center" variant="xs" mt={5} color="brand.gray.200">
          {t.help}
        </Text>
      )}
      {isEmpty && (
        <Text mt={10} variant="xs">
          {t.no_results}
        </Text>
      )}

      {/* TO DO ORDER */}

      {/* {input_order.map((inputId) => {
        const current = authorizedInputs.find(
          (c: IQuestion) => c.id === inputId
        );
        if (current !== undefined) {
          return renderCard(current);
        } else return;
      })} */}
      {authorizedInputs.map((input: IQuestion) => {
        return renderCard(input);
      })}
    </Container>
  );
};
