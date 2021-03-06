import { map, switchMap } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "redux/store";
import { actions } from "redux/slices/scientistData";
import { client } from "call/actions";
import {
  GET_SURVEY_BY_SLUG,
  UPDATE_ORDER,
  UPDATE_SURVEY,
} from "call/queries/survey";
import { CHECK_SURVEY } from "call/queries/formBuilder/condition";

// Watches over "initialize" currentsurvey
const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.initializeSurvey.type),
    switchMap((action) => {
      return client.request(GET_SURVEY_BY_SLUG, { slug: action.payload });
    }),
    map((result) => {
      const payload = result.surveys[0];
      return actions.initializedSurvey(payload);
    })
  );

// Watches over "updateOrder" currentsurvey
const updateOrderEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.updateOrder.type),
    map((action) => action.payload),
    switchMap((payload) => {
      const selectedSurveyId = state$.value.scientistData.survey.selectedSurvey;
      return client.request(UPDATE_ORDER, {
        id: selectedSurveyId,
        new_order: payload,
      });
    }),
    map((payload) => {
      return actions.updatedOrder(payload);
    })
  );

// Watches over "update" currentsurvey => update the needConsent change

const updateSurveyEpic: Epic = (action$) =>
  action$.pipe(
    ofType(actions.updateSurvey.type),
    map((action) => action.payload),
    switchMap((payload) => {
      console.log("payload", payload);
      return client.request(UPDATE_SURVEY, {
        id: payload.id,
        data: {
          needConsent: payload.needConsent,
        },
      });
    }),
    map((payload) => {
      return actions.updatedSurvey(payload);
    })
  );

const TestEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(actions.checkSurvey.type),
    map((action) => action.payload),
    switchMap(() => {
      const selectedSurveyId = state$.value.scientistData.survey.selectedSurvey;
      return client.request(CHECK_SURVEY, {
        surveyId: selectedSurveyId,
      });
    }),
    map((payload) => {
      return actions.checkedSurvey(payload);
    })
  );

export const surveyEpics = combineEpics(
  initializeEpic,
  updateOrderEpic,
  TestEpic,
  updateSurveyEpic
);
