import React from "react";

import { Container, Text } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import IQuestion from "interfaces/form/question";
import ICondition from "interfaces/form/condition";
import { authorizedInputTypes } from "./utils";
import { t } from "static/input";
import { InputBox } from "components/CreateSurvey/CreateForm/InputsPreview/InputBox";
import { useGetQuestions } from "api/actions/question";
import { useUpdateCondition } from "api/actions/condition";
import { useGetSurvey } from "api/actions/survey";
import { selectPage } from "redux/slices/formBuilder";

interface Props {
  currentCondition: ICondition | undefined;
}

export const Step_1: React.FC<Props> = ({ currentCondition }) => {
  const dispatch = useAppDispatch();

  const { mutateAsync: updateCondition } = useUpdateCondition(
    currentCondition?.id
  );
  const { selected_input, selected_page } = useAppSelector(
    (state) => state.formBuilder
  );
  const { data } = useGetQuestions({
    page_id: selected_page.id,
  });

  const dev_survey = "60e8463984797ac0ac30001e";
  const { data: survey } = useGetSurvey({ id: dev_survey });

  React.useEffect(() => {
    // Select first page if we make a condition on page.
    if (currentCondition?.type === "page") {
      dispatch(selectPage(survey?.survey.pages[0]));
    }
  }, [currentCondition?.type]);

  // Si currentCondition.type === "page" alors on affiche les inputs des pages précédantes.
  // Si currentCondition.type === "input" alors on affiche les inputs précédants l'input referent
  const inputOrder: string[] = survey?.survey.order;
  const currentInputIndex = inputOrder.findIndex(
    (id: string) => id === currentCondition?.referer_question?.id
  );
  const inputsBeforeCurrent = inputOrder.slice(0, currentInputIndex);
  console.log(inputsBeforeCurrent);
  // Remove all types who can't be conditionable, remove the selected input, remove input after the selected one.
  const authorizedInputs = data.questions
    .filter((q: IQuestion) => authorizedInputTypes.includes(q.type))
    .filter((q: IQuestion) => q.id !== selected_input.id);

  if (currentCondition?.type === "input") {
    authorizedInputs.filter((q: IQuestion) =>
      inputsBeforeCurrent.includes(q.id)
    );
    authorizedInputs;
  }

  const isEmpty = authorizedInputs.length === 0;

  const renderCard = (input: IQuestion) => {
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

      {inputOrder.map((inputId: string) => {
        const current = authorizedInputs.find(
          (c: IQuestion) => c.id === inputId
        );
        if (current !== undefined) {
          return renderCard(current);
        } else return;
      })}
    </Container>
  );
};
