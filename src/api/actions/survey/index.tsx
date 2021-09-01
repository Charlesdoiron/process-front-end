import { request } from "graphql-request";
import {
  GET_SURVEY,
  GET_SURVEYS,
  DELETE_SURVEY,
  ADD_SURVEY,
} from "api/queries/survey";
import { UPDATE_ORDER } from "api/queries/survey";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { optimisticUpdate } from "api/optimisiticUpdate";
import ISurvey, { ISurveyRes, ISurveysRes } from "types/survey";
import { API_URL } from "constants/api";

export const useAddSurvey: any = (): UseMutationResult<
  Partial<ISurvey>,
  Error
> =>
  useMutation<ISurvey, Error, any>(
    async (description: ISurvey) =>
      await request(API_URL, ADD_SURVEY, {
        description,
      }),
    optimisticUpdate(["getSurvey"])
  );

export const useGetSurvey = (id: string): UseQueryResult<ISurveyRes, Error> =>
  useQuery<ISurveyRes, Error>(
    ["getSurvey", id],
    () =>
      request(API_URL, GET_SURVEY, {
        id,
      }),
    { enabled: !!id }
  );

export const useGetSurveys = (): UseQueryResult<ISurveysRes, Error> =>
  useQuery<ISurveysRes, Error>("getSurveys", () =>
    request(API_URL, GET_SURVEYS)
  );

export const deleteSurvey: any = () =>
  useMutation(
    async (id: string) =>
      await request(API_URL, DELETE_SURVEY, {
        id,
      }),
    optimisticUpdate(["getSurvey"])
  );

export const useUpdateOrder: any = (new_order: string[]) =>
  useMutation(
    async ({ id, new_order }: { id: string; new_order: string[] }) =>
      await request(API_URL, UPDATE_ORDER, {
        id,
        new_order,
      }),
    optimisticUpdate(["getSurvey", "getQuestions"], new_order)
  );