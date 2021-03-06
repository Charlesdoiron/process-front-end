import { createEntityAdapter, createSlice, PayloadAction, Update } from "@reduxjs/toolkit";

import { actions as statusAct } from 'redux/slices/participation/status';
import { RootState } from "redux/store";

// ---- INITIAL STATE

export interface Answer {
  id?: string;
  questionId: string;
  value: unknown;
}

// ---- ACTIONS

export type UpsertAnswerPayload = {
  questionId: string,
  value: string,
}

export type UpsertedAnswerPayload = {
  created: Update<Answer>[]
  updated: Update<Answer>[]
}

// ---- SLICE

const SLICE_NAME = 'answers';

const adapter = createEntityAdapter<Answer>({
  selectId: (a) => a.questionId,
});

export const slice = createSlice({
  name: SLICE_NAME,
  initialState: adapter.getInitialState(),
  reducers: {
    update: (state, action: PayloadAction<UpsertAnswerPayload>) => {
      adapter.upsertOne(state, action.payload);
    },
    updated: (state, action: PayloadAction<UpsertedAnswerPayload>) => {
      // Update only those who have been created to keep their answerId
      adapter.updateMany(state, action.payload.created);
    }
  },
  extraReducers: builder => {
    builder.addCase(statusAct.initialized, (state, action) => {
      const sanitized = action.payload.answers.map(a => ({ id: a.id, questionId: a.question.id, value: a.value }));
      adapter.setAll(state, sanitized);
    });
  }
});

// ---- SELECTORS

const entitySelectors = adapter.getSelectors();

const selectById = (state: RootState, questionId: string | undefined): Answer | undefined => {
  if (!questionId) return;
  return entitySelectors.selectById(state.participation.answers, questionId);
};

const selectByIds = (state: RootState, questionsId: string[]): Answer[] => {
  const answerState = state.participation.answers;

  const answers = questionsId.reduce((acc, qId) => {
    const answer = entitySelectors.selectById(answerState, qId);
    if (answer) acc.push(answer);
    return acc;
  }, [] as Answer[]);
    
  return answers;
};

const selectAll = (state: RootState): Answer[] => entitySelectors.selectAll(state.participation.answers);

export const selectors = {
  selectAll,
  selectById,
  selectByIds,
};

// ---- ACTIONS

export const actions = slice.actions;

export default slice.reducer;
