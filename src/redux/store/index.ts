import {
  configureStore,
  getDefaultMiddleware,
  AnyAction,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  Epic as ReduxEpic,
  combineEpics,
  createEpicMiddleware,
} from "redux-observable";

import { connectRouter } from "connected-react-router";
import { routerMiddleware } from "connected-react-router";
import formBuilder from "redux/slices/formBuilder";
import application from "redux/slices/application";
import landingBuilder from "redux/slices/landingBuilder";
import participation from "redux/slices/participation";
import surveyBuilder from "redux/slices/surveyBuilder";
import landingEditor from "redux/slices/landing-editor";
import surveyEditor from "redux/slices/survey-editor";
import questions from "redux/slices/question-editor";
import conditions from "redux/slices/condition-editor";
import pages from "redux/slices/page-editor";
import surveys from "redux/slices/my-surveys";
import survey from "redux/slices/survey";

import { pingEpic } from "redux/slices/participation/epic";
import { landingEditorEpics } from "redux/epics/landing-editor";
import { surveyEditorEpics } from "redux/epics/survey-editor";
import { surveysEpics } from "redux/epics/my-surveys";
import { surveyEpics } from "redux/epics/survey";

import { pageEditorEpic } from "redux/epics/page-editor";
import { questionEditorEpic } from "redux/epics/question-editor";

import { history } from "./history";
// ---- EPICS

// Generic type of an epic
export type Epic = ReduxEpic<AnyAction, AnyAction, RootState, unknown>;

// Combine all epics from all the app
export const rootEpic = combineEpics(
  pingEpic,
  landingEditorEpics,
  surveyEditorEpics,
  pageEditorEpic,
  questionEditorEpic,
  surveysEpics,
  surveyEpics
);

// Create a middleware to set in the store
const epicMiddleware = createEpicMiddleware<
  AnyAction,
  AnyAction,
  RootState,
  unknown
>();

// ---- REDUCERS

const formEditor = combineReducers({
  survey,
  pages,
  questions,
  conditions,
});

const combinedReducer = combineReducers({
  formBuilder,
  landingBuilder,
  surveyBuilder,
  application,
  participation,
  landingEditor,
  surveyEditor,
  formEditor,
  surveys,
  router: connectRouter(history),
});

// ---- STORE

export const store = configureStore({
  reducer: combinedReducer,
  middleware: [
    ...getDefaultMiddleware(),
    epicMiddleware,
    routerMiddleware(history),
  ],
});

// Run all the epics
epicMiddleware.run(rootEpic);

// ---- TYPES

// Infer `RootState` from the combined reducers. We CANNOT infer it from the store, since RootState is needed in the epic middleware
// and the epic middleware is needed in the store. We would have a circular reference: "store -> RootState -> epic middleware -> store"
export type RootState = ReturnType<typeof combinedReducer>;
// Infer `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
