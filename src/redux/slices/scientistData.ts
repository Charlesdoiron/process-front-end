import { createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";

import {
  authReducers,
  authSelectors,
  AuthState,
  initialAuthState,
} from "./scientistData/auth";
import {
  CheckSurvey,
  conditionAdapter,
  ConditionEditor,
  conditionsReducers,
  conditionsSelectors,
  initialConditionState,
} from "./scientistData/condition-editor";
import {
  initialSurveysState,
  surveysAdapter,
  SurveysEditor,
  surveysReducers,
  surveysSelectors,
} from "./scientistData/surveys";

import {
  pageAdapter,
  PageEditor,
  pageReducer,
  pageSelectors,
  initialPageState,
} from "./scientistData/page-editor";
import {
  initialQuestionState,
  questionAdapter,
  QuestionEditor,
  questionsReducers,
  questionsSelectors,
} from "./scientistData/question-editor";
import {
  initialSurveyState,
  SurveyEditor,
  surveyReducers,
  surveySelectors,
} from "./scientistData/survey-editor";

import {
  LastUpdated,
  ConditionRedux,
  PageRedux,
  QuestionRedux,
  SurveyRedux,
} from "./types";

type LoadedPayload = SurveyRedux;

// ---- TYPES

export interface GlobalState {
  pages: EntityState<PageRedux> & PageEditor;
  questions: EntityState<QuestionRedux> & QuestionEditor;
  conditions: EntityState<ConditionRedux> & ConditionEditor;
  survey: SurveyEditor;
  auth: AuthState;
  surveys: EntityState<SurveyRedux> & SurveysEditor;
}

// ----- SLICE

const SLICE_NAME = "scientistData";

export const globalSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    pages: pageAdapter.getInitialState(initialPageState),
    questions: questionAdapter.getInitialState(initialQuestionState),
    conditions: conditionAdapter.getInitialState(initialConditionState),
    survey: initialSurveyState,
    auth: initialAuthState,
    surveys: surveysAdapter.getInitialState(initialSurveysState),
  },
  reducers: {
    ...pageReducer,
    ...surveyReducers,
    ...questionsReducers,
    ...conditionsReducers,
    ...authReducers,
    ...surveysReducers,

    initializeSurvey: (
      state: GlobalState,
      _action: PayloadAction<string>
    ): void => {
      state.survey.isLoading = true;
    },
    initializedSurvey: (
      state: GlobalState,
      action: PayloadAction<LoadedPayload>
    ): void => {
      state.survey.isLoading = false;
      const survey = action.payload;
      state.survey.data = survey;
      state.survey.selectedSurvey = survey.id;
      state.survey.order = survey?.attributes?.order;
      const pages = survey?.attributes?.pages?.data;
      const questions = pages
        ?.map((page) => page?.attributes?.questions?.data)
        .flat();
      const questionsConditions = questions
        ?.map((question) => question?.attributes?.conditions?.data)
        .flat();

      if (pages) {
        pageAdapter.setMany(state.pages, pages);
        state.pages.selectedPage = pages[0].id;

        pages.map((p) => {
          const questions = p?.attributes?.questions?.data;
          const pageConditions = p?.attributes?.conditions?.data;

          if (questions) {
            questionAdapter.setMany(state.questions, questions);
          }
          if (pageConditions) {
            conditionAdapter.setMany(state.conditions, pageConditions);
          }
        });
      }
      if (questionsConditions) {
        questionsConditions.map((condition) => {
          if (condition) {
            conditionAdapter.setOne(state.conditions, condition);
          }
        });
      }
      state.survey.isLoading = false;
      state.pages.isLoading = false;
      state.questions.isLoading = false;
      state.conditions.isLoading = false;
    },
    updateSurvey: (state: GlobalState, action: PayloadAction<any>) => {
      surveysAdapter.updateOne(state.surveys, action.payload);
    },
    updatedSurvey: (state: GlobalState, action: PayloadAction<LastUpdated>) => {
      state.surveys.lastUpdated = action.payload.lastUpdated;
    },
    updateOrder: (state: GlobalState, action: PayloadAction<string[]>) => {
      state.survey.isOrdering = true;
      state.survey.order = action.payload;
    },
    updatedOrder: (state: GlobalState, _action: PayloadAction<string>) => {
      state.survey.isOrdering = false;
    },
    checkSurvey: (state: GlobalState, action: PayloadAction<boolean>) => {
      state.survey.isChecking = action.payload;
    },
    checkedSurvey: (state: GlobalState, action: PayloadAction<CheckSurvey>) => {
      state.survey.status = action.payload;
      state.survey.isChecking = false;
    },
  },
});

export const selectors = {
  pages: pageSelectors,
  survey: surveySelectors,
  questions: questionsSelectors,
  conditions: conditionsSelectors,
  mySurveys: surveysSelectors,
  auth: authSelectors,
};

export const actions = globalSlice.actions;
export default globalSlice.reducer;
