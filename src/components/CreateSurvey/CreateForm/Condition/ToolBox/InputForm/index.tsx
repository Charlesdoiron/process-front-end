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
import { selectCondition, setIsRemoving } from "redux/slices/formBuilder";

import { Switch } from "components/Fields";
import { t } from "static/condition";
import { InputIcon } from "components/CreateSurvey/CreateForm/InputIcon";
import ISurvey from "types/survey";
import {
  selectors as selectorsQuestion,
  actions as actionsQuestion,
} from "redux/slices/formEditor/question-editor";
import {
  selectors as selectorsCondition,
  actions as actionsCondition,
} from "redux/slices/formEditor/condition-editor";
import {
  selectors as selectorsApplication,
  actions as actionsApplication,
} from "redux/slices/application";

interface Props {
  survey: ISurvey | Record<string, any>;
}

const InputForm: React.FC<Props> = ({ survey }) => {
  const dispatch = useAppDispatch();
  const currentConditions = useAppSelector(
    selectorsCondition.getSelectedQuestionsConditions
  );
  const isEditing = useAppSelector(selectorsApplication.isEditing);
  const selectedQuestion = useAppSelector(
    selectorsQuestion.getSelectedQuestion
  );
  const selectedQuestionId = useAppSelector(
    selectorsQuestion.getSelectedQuestionId
  );
  const [prevState, setPrevState] =
    useState<Record<string, any>>(selectedQuestion);

  const type = selectedQuestion?.type;

  console.log(currentConditions);

  const handleCancel = async () => {
    if (!isEditing) {
      dispatch(actionsQuestion.delete(selectedQuestionId));
    } else {
      dispatch(actionsApplication.toogleDrawer());
      dispatch(
        actionsQuestion.update({
          id: selectedQuestionId,
          changes: prevState,
        })
      );
    }
    dispatch(actionsApplication.setIsEditing(false));
  };

  // Save state to get diff
  useEffect(() => {
    setPrevState(prevState);
  }, []);

  const handleSubmit = useCallback((data, { setSubmitting, validateForm }) => {
    validateForm(data);
    setSubmitting(true);
    const newChanges = getDiff(data, prevState);
    dispatch(actionsQuestion.save({ changes: newChanges }));
    setSubmitting(false);
  }, []);

  const createCondition = (group?: string) => {
    dispatch(
      actionsCondition.create({
        type: "question",
        refererId: selectedQuestionId,
        group,
      })
    );
  };

  return (
    <Formik
      validationSchema={renderFormValidationSchema(selectedQuestion)}
      initialValues={selectedQuestion ? selectedQuestion : fields[type]}
      onSubmit={handleSubmit}
    >
      {({ isValid, isSubmitting, values }) => {
        useEffect(() => {
          const newChanges = getDiff(values, selectedQuestion);
          if (values) {
            dispatch(
              actionsQuestion.update({
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
              px={10}
            >
              <Flex
                borderBottom="1px solid"
                borderColor="black"
                justifyContent="space-between"
                w="100%"
                pt={5}
                pb={1}
                mb={4}
                alignItems="start"
              >
                <Flex alignItems="center">
                  <InputIcon type={type} />
                  <Box ml={2}>
                    <Text variant="xsMedium">
                      {survey?.order?.findIndex(
                        (id: string) => id === selectedQuestionId
                      ) + 1}
                    </Text>
                    <Text variant="xs">Question {type}</Text>
                  </Box>
                </Flex>
                {type !== "wysiwyg" && (
                  <Flex flexDirection="column">
                    <Switch label="" id="required" size="sm" />
                    <Text variant="xsMedium">Réponse obligatoire</Text>
                  </Flex>
                )}
              </Flex>

              <Box mb={8}>{renderFormTemplate(selectedQuestion)}</Box>

              <Flex
                alignItems="center"
                w="100%"
                justifyContent="space-between"
                mt={5}
                pb="100px"
              >
                {currentConditions.length === 0 ? (
                  <Button
                    variant="link"
                    color="brand.blue"
                    onClick={() => createCondition()}
                  >
                    {t.add_condition}
                  </Button>
                ) : (
                  <Button
                    variant="link"
                    color="brand.blue"
                    onClick={() => {
                      dispatch(selectCondition(currentConditions[0]));
                      dispatch(actionsApplication.toogleDrawer());
                    }}
                  >
                    {t.edit_condition}
                  </Button>
                )}
              </Flex>

              <Footer
                onSubmit={() => console.log("submit")}
                disabled={!isValid || isSubmitting}
                onCancel={handleCancel}
                onDelete={() => {
                  dispatch(setIsRemoving(selectedQuestionId));
                  dispatch(actionsApplication.toogleDrawer());
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
