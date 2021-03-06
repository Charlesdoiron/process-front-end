import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import {
  GET_QUESTION,
  ADD_QUESTION,
  GET_QUESTIONS_BY_PAGE,
  DELETE_QUESTION,
  UPDATE_QUESTION,
  GET_QUESTION_EVALUATION,
} from "call/queries/formBuilder/question";
import IQuestion, { IQuestionsRes, IQuestionRes } from "types/form/question";
import { optimisticUpdate } from "call/optimisiticUpdate";
import { client } from "call/actions";
import IOperator from "types/form/operator";

// ---- GETTERS

// SINGLE

export const useGetQuestion = (
  id: string
): UseQueryResult<IQuestionRes, Error> => {
  return useQuery<IQuestionRes, Error>(
    ["getQuestion", id],
    async () => {
      return await client.request(GET_QUESTION, {
        id,
      });
    },
    { enabled: !!id }
  );
};

// MANY

export const useGetQuestions = (
  page_id: string | undefined
): UseQueryResult<IQuestionsRes, Error> => {
  return useQuery<IQuestionsRes, Error>(
    ["getQuestions", page_id],
    async () => {
      return await client.request(GET_QUESTIONS_BY_PAGE, {
        page_id,
      });
    },
    { enabled: !!page_id }
  );
};

// QUESTION EVALUATION

export interface QuestionEvaluationResult {
  evaluation: {
    id: string;
    conditions: [EvaluationCondition];
  };
}

export interface EvaluationCondition {
  id: string,
  group: string,
  operator: IOperator['id'],
  target_value: string,
  answer?: unknown,
}

export const useQuestionEvaluation = (
  questionId: string,
  participationId: string
): UseQueryResult<QuestionEvaluationResult, Error> => {
  return useQuery<QuestionEvaluationResult, Error>(
    ["questionEvaluation", questionId, participationId],
    async () => {
      return await client.request(GET_QUESTION_EVALUATION, {
        questionId,
        participationId,
      });
    },
    { enabled: Boolean(questionId) && Boolean(participationId) }
  );
};

// ---- CRUD

export const useAddQuestion = (
  values?: IQuestion
): UseMutationResult<Partial<IQuestion>, Error> =>
  useMutation<IQuestion, Error, any>(
    async (values: IQuestion) => {
      return await client.request(ADD_QUESTION, {
        values,
      });
    },

    optimisticUpdate(["getQuestions"], values)
  );

export const useUpdateQuestion = (
  id?: string,
  data?: IQuestion
): UseMutationResult<IQuestion, Error> =>
  useMutation<IQuestion, Error, any>(
    async ({ id, data }: { id: string; data: IQuestion }) =>
      client.request(UPDATE_QUESTION, {
        id,
        data,
      }),
    optimisticUpdate(["getQuestions"], data)
  );

export const useDeleteQuestion = (
  id?: string
): UseMutationResult<IQuestion, Error> =>
  useMutation<IQuestion, Error, any>(
    async (id: IQuestion["id"]) =>
      await client.request(DELETE_QUESTION, {
        id,
      }),
    optimisticUpdate(["getQuestions", "getSurvey"], id)
  );
