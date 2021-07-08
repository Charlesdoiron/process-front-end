import { useMutation, useQuery } from "react-query";
import { request } from "graphql-request";
import {
  GET_QUESTION,
  ADD_QUESTION,
  GET_QUESTIONS,
  DELETE_QUESTION,
  UPDATE_QUESTION,
} from "api/queries/question";
import IQuestion from "interfaces/form/question";
import { optimisticUpdate } from "api/optimisiticUpdate";

export const useGetQuestion: any = ({ id }: { id: string }) => {
  return useQuery(
    ["getQuestion", id],
    async () => {
      return await request(process.env.REACT_APP_API_URL_DEV!, GET_QUESTION, {
        id,
      });
    },
    { enabled: !!id }
  );
};

export const useGetQuestions: any = ({ page_id }: { page_id: string }) => {
  return useQuery(
    ["getQuestions", page_id],
    async () => {
      return await request(process.env.REACT_APP_API_URL_DEV!, GET_QUESTIONS, {
        page_id,
      });
    },
    { enabled: !!page_id }
  );
};

export const useAddQuestion: any = (new_question: IQuestion) =>
  useMutation(
    async (new_question: IQuestion) => {
      const response = await request(
        process.env.REACT_APP_API_URL_DEV!,
        ADD_QUESTION,
        {
          new_question,
        }
      );
      // TO DO update order here ?
      // await request(process.env.REACT_APP_API_URL_DEV!, UPDATE_ORDER, {
      //   id: response.createQuestion.question.id,
      // });

      return response;
    },

    optimisticUpdate(["getQuestions"], new_question)
  );

export const useUpdateQuestion: any = (id: string, data: IQuestion) =>
  useMutation(
    async ({ id, data }: { id: string; data: IQuestion }) =>
      request(process.env.REACT_APP_API_URL_DEV!, UPDATE_QUESTION, {
        id,
        data,
      }),
    optimisticUpdate(["getQuestions"], data)
  );

export const useDeleteQuestion: any = ({ id }: { id: string }) =>
  useMutation(
    async (id: IQuestion["id"]) =>
      await request(process.env.REACT_APP_API_URL_DEV!, DELETE_QUESTION, {
        id,
      }),
    optimisticUpdate(["getQuestions"], id)
  );
