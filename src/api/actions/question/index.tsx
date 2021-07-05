import { useMutation, useQuery } from "react-query";
import { request } from "graphql-request";
import {
  ADD_QUESTION,
  GET_QUESTIONS,
  DELETE_QUESTION,
  GET_QUESTION,
  UPDATE_QUESTION,
} from "api/queries/question";
import IQuestion from "interfaces/form/question";
import { getSurveyOptimisticUpdate } from "api/optimisiticUpdate";

export const getQuestions: any = () => {
  return useQuery("getQuestions", async () => {
    return await request(process.env.REACT_APP_API_URL_DEV!, GET_QUESTIONS);
  });
};

export const getQuestion: any = ({ id }: { id: string }) => {
  return useQuery(["getQuestion", id], async () => {
    return await request(process.env.REACT_APP_API_URL_DEV!, GET_QUESTION, {
      id,
    });
  });
};

export const addQuestion: any = () =>
  useMutation(
    async (new_question: IQuestion) =>
      await request(process.env.REACT_APP_API_URL_DEV!, ADD_QUESTION, {
        new_question,
      }),
    getSurveyOptimisticUpdate("getSurveyById")
    // TO DO Update Order
  );

export const updateQuestion: any = () =>
  useMutation(
    async ({ id, data }: { id: string; data: IQuestion }) =>
      await request(process.env.REACT_APP_API_URL_DEV!, UPDATE_QUESTION, {
        id,
        data,
      }),
    getSurveyOptimisticUpdate("getSurveyById")
    // TO DO Update Order
  );

export const deleteQuestion: any = () =>
  useMutation(
    async (question_id: IQuestion["id"]) =>
      await request(process.env.REACT_APP_API_URL_DEV!, DELETE_QUESTION, {
        question_id,
      }),
    getSurveyOptimisticUpdate("getSurveyById")
    // TO DO Update Order
  );
