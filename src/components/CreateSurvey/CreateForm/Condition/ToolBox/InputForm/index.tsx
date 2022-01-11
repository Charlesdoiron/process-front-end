import React, { useEffect, useState, useCallback } from "react";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { Footer } from "./Template/Footer";
import {
  getDiff,
  renderFormTemplate,
  renderFormValidationSchema,
} from "./utils";
import { fields } from "./Template/logic/initialValues";
import { setIsRemoving } from "redux/slices/formBuilder";

import { t } from "static/condition";
import { InputIcon } from "components/CreateSurvey/CreateForm/InputIcon";
import { selectors, actions } from "redux/slices/scientistData";
import { actions as appActions } from "redux/slices/application";

import {
  selectors as formBuilderSelectors,
  actions as formBuilderAction,
} from "redux/slices/formBuilder";
import { TitleDivider } from "components/TitleDivider";
import { getQuestionName } from "constants/inputs";

interface Props {
  order: string[];
}

const InputForm: React.FC<Props> = ({ order }) => {
  const dispatch = useAppDispatch();
  const currentConditions = useAppSelector(
    selectors.conditions.getSelectedQuestionsConditions
  );
  const isEditing = useAppSelector(formBuilderSelectors.isEditing);
  const selectedQuestion = useAppSelector(
    selectors.questions.getSelectedQuestion
  );
  const selectedQuestionId = useAppSelector(
    selectors.questions.getSelectedQuestionId
  );
  const [prevState, setPrevState] =
    useState<Record<string, any>>(selectedQuestion);

  const type = selectedQuestion?.type;

  const handleCancel = async () => {
    if (!isEditing) {
      dispatch(actions.deleteQuestion(selectedQuestionId));
    } else {
      dispatch(appActions.toogleDrawer());
      dispatch(
        actions.updateQuestion({
          id: selectedQuestionId,
          changes: prevState,
        })
      );
    }
    dispatch(formBuilderAction.setIsEditing(false));
    dispatch(actions.setSelectedQuestion(""));
  };
  console.log(selectedQuestion);
  // Save state to get diff
  useEffect(() => {
    setPrevState(prevState);
  }, [selectedQuestionId]);

  const handleSubmit = useCallback((data, { setSubmitting, validateForm }) => {
    validateForm(data);
    setSubmitting(true);
    dispatch(actions.saveQuestion({ changes: data }));
    setSubmitting(false);
  }, []);

  const createCondition = () => {
    dispatch(
      actions.createCondition({
        type: "question",
        refererId: selectedQuestionId,
      })
    );
    dispatch(appActions.toogleDrawer());
  };

  const editCondition = (id: string) => {
    dispatch(actions.setSelectedCondition(id));
    dispatch(actions.setValidityCondition(true));
    dispatch(appActions.toogleDrawer());
  };
  if (!selectedQuestion) {
    return <p>no selectedQuestion</p>;
  }

  return (
    <Formik
      validateOnBlur
      validationSchema={renderFormValidationSchema(selectedQuestion)}
      initialValues={selectedQuestion ? selectedQuestion : fields[type]}
      onSubmit={handleSubmit}
    >
      {({ isValid, isSubmitting, values, setFieldValue }) => {
        useEffect(() => {
          const newChanges = getDiff(values, selectedQuestion);
          if (values) {
            dispatch(
              actions.updateQuestion({
                id: selectedQuestionId,
                changes: {
                  ...newChanges,
                },
              })
            );
          }
        }, [values]);

        return (
          <Form>
            <Flex
              alignItems="center"
              justifyContent="center"
              fontSize="30"
              flexDirection="column"
              px={5}
            >
              <Flex
                alignItems="center"
                justifyContent="space-between"
                w="100%"
                mt="5"
              >
                <Text variant="smallTitle" textAlign="left">
                  {getQuestionName(type)}
                </Text>

                <Flex ml={2} alignItems="center">
                  <InputIcon type={type} />

                  <Text variant="xsMedium" ml="3">
                    {order?.findIndex(
                      (id: string) => id === selectedQuestionId
                    ) + 1}
                  </Text>
                </Flex>
              </Flex>
              <TitleDivider title="Champs génériques" />
              <Flex mb="7" w="100%" justifyContent="space-between">
                {currentConditions.length === 0 ? (
                  <Button
                    variant="roundedTransparent"
                    onClick={() => createCondition()}
                  >
                    {t.add_condition}
                  </Button>
                ) : (
                  <Button
                    variant="roundedTransparent"
                    onClick={() => editCondition(currentConditions[0].id)}
                  >
                    {t.edit_condition}
                  </Button>
                )}
                {type !== "wysiwyg" && (
                  <Button
                    ml="5"
                    variant={values.required ? "rounded" : "roundedTransparent"}
                    onClick={() => setFieldValue("required", !values.required)}
                  >
                    {values.required
                      ? "Rendre la réponse obligatoire"
                      : "Rendre la réponse facultative"}
                  </Button>
                )}
              </Flex>
              <Box w="100%" mb={8}>
                {renderFormTemplate(selectedQuestion)}
              </Box>

              <Flex
                alignItems="center"
                w="100%"
                justifyContent="space-between"
                mt={5}
                pb="100px"
              ></Flex>
              <Footer
                onSubmit={() => console.log("submit")}
                disabled={!isValid || isSubmitting}
                onCancel={handleCancel}
                onDelete={() => {
                  dispatch(setIsRemoving(selectedQuestionId));
                  dispatch(appActions.toogleDrawer());
                }}
              />
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InputForm;
