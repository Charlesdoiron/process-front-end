import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { useGetPage } from "call/actions/formBuider/page";
import { renderInput } from "components/CreateSurvey/CreateForm/InputsPreview/Card/utils";
import {
  useGetQuestion,
  useQuestionEvaluation,
} from "call/actions/formBuider/question";
import { NL } from "../nl";
import { shouldShow } from "./condition-evaluations";
import { useAnswerSaver, useAnswersGetter } from "./answer-hooks";

// ---- TYPES

interface Props {
  pageId: string;
  participationId: string;
}

// ---- COMPONENT

export const FormPage: React.FC<Props> = ({ pageId, participationId }) => {
  // Get page
  const { data } = useGetPage(pageId);

  // Get answers
  const questionsId = data?.page.questions?.map((q) => q.id) ?? [];
  const answers = useAnswersGetter(participationId, questionsId);

  // If page is empty
  if (!data?.page) return <Box mt="60">{NL.msg.nodata}</Box>;

  // Final render
  return (
    <Box>
      <Text variant="xl" my="20px">
        {data.page.name}
      </Text>

      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={answers.values}
        enableReinitialize
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
        }}
      >
        {() => {
          return (
            <Form>
              {/* Questions */}
              <Box px="10%" pt="20px">
                {data.page.questions?.map((q) => (
                  <Questionator
                    key={q.id}
                    id={q.id}
                    participationId={participationId}
                    answerId={answers.references.get(q.id)}
                  />
                ))}
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

// ---- SUB COMPONENTS

type QuestionatorProps = {
  id: string;
  participationId: string;
  answerId?: string;
};

const Questionator: React.FC<QuestionatorProps> = ({
  id,
  participationId,
  answerId,
}) => {
  const { data: rawEvaluation } = useQuestionEvaluation(id, participationId);
  const { data: rawQuestion, isLoading } = useGetQuestion(id);

  const show = shouldShow(rawEvaluation?.evaluation.conditions);

  useAnswerSaver(id, participationId, answerId);

  if (isLoading) return <div>Loading...</div>;
  if (!rawQuestion?.question) return <div>Oups</div>;
  if (!show) return null;

  return (
    <Box mb="10" backgroundColor="white" w="100%" p="40px">
      {renderInput(rawQuestion.question)}
    </Box>
  );
};