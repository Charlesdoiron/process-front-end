import { request } from "graphql-request";
import { ADD_PAGE, UPDATE_PAGE, DELETE_PAGE } from "api/queries/page";

import IPage from "interfaces/form/page";
import { useMutation } from "react-query";
import { getSurveyOptimisticUpdate } from "api/optimisiticUpdate";

export const useAddPage: any = () =>
  useMutation(
    async (values: Partial<IPage>) =>
      await request(process.env.REACT_APP_API_URL_DEV!, ADD_PAGE, {
        values,
      }),
    getSurveyOptimisticUpdate("getSurvey")
  );

export const updatePage: any = () =>
  useMutation(
    async ({ id, data }: { id: string; data: Partial<IPage> }) =>
      await request(process.env.REACT_APP_API_URL_DEV!, UPDATE_PAGE, {
        id,
        data,
      }),
    getSurveyOptimisticUpdate("getSurvey")
  );

export const deletePage: any = () =>
  useMutation(
    async (id: IPage["id"]) =>
      await request(process.env.REACT_APP_API_URL_DEV!, DELETE_PAGE, {
        id,
      }),
    getSurveyOptimisticUpdate("getSurvey")
  );
