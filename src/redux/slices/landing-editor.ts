import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "redux/store";
import { ILanding } from "types/landing";
import { RootState } from "redux/store";
import { DateTime } from "luxon";

// ---- STATE

export interface LandingEditor {
  // Page status
  isLoading: boolean;
  error?: string;
  isEditingAbout: boolean;
  lastUpdated: string;
  lastSaved: string;
  // Date
  // TODO: not fond of the Partial here... need to redefine what's mandatory in a Landing page ?
  data?: Partial<ILanding>;
}

const initialState: LandingEditor = {
  isLoading: true,
  isEditingAbout: false,
  lastUpdated: new Date().toISOString(),
  lastSaved: new Date().toISOString(),
};

// ---- ACTIONS

type LoadedPayload = ILanding;

type UpdatePayload = Partial<ILanding>;

type UpdatedPayload = {
  lastSaved: string;
};

// ----- SLICE
const SLICE_NAME = "landing-editor";

export const landingEditorSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    load: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    loaded: (state, action: PayloadAction<LoadedPayload>) => {
      // Switch flags
      state.isLoading = false;

      // Update landing data
      const landing = action.payload;
      state.data = landing;
    },
    update: (state, action: PayloadAction<UpdatePayload>) => {
      state.lastUpdated = new Date().toISOString();
      const updated = { ...state.data, ...action.payload };
      state.data = updated;
    },
    updated: (state, action: PayloadAction<UpdatedPayload>) => {
      state.lastSaved = action.payload.lastSaved;
    },
    editAbout: (state, action: PayloadAction<boolean>) => {
      state.isEditingAbout = action.payload;
    },
  },
});

// ---- SELECTORS

export const error = (state: RootState): string | undefined =>
  state.editor.landing.error;
export const isLoading = (state: RootState): boolean =>
  state.editor.landing.isLoading;
export const landingHasChanges = (state: RootState): boolean => {
  const updated = DateTime.fromISO(state.editor.landing.lastUpdated);
  const saved = DateTime.fromISO(state.editor.landing.lastSaved);
  return updated > saved;
};

export const isEditingAbout = (state: RootState): boolean =>
  state.editor.landing.isEditingAbout;
export const hasMembers = (state: RootState): boolean =>
  (state.editor.landing.data?.members ?? []).length > 0;

export const landing = (state: RootState): Partial<ILanding> | undefined =>
  state.editor.landing.data;
export const members = (state: RootState): ILanding["members"] =>
  state.editor.landing.data?.members ?? [];
export const partners = (state: RootState): ILanding["partners"] =>
  state.editor.landing.data?.partners ?? [];
export const about = (state: RootState): ILanding["about_page"] | undefined =>
  state.editor.landing.data?.about_page;

type HeaderData = Partial<Pick<ILanding, "title" | "color_theme" | "logo">>;

export const headerData = (state: RootState): HeaderData | undefined => {
  if (!state.editor.landing.data) return;

  const { title, color_theme, logo } = state.editor.landing.data;
  return {
    title,
    color_theme,
    logo,
  };
};

export const selectors = {
  error,
  isLoading,
  landingHasChanges,
  isEditingAbout,
  hasMembers,
  headerData,
  landing,
  members,
  partners,
  about,
};

// ---- EXPORTS

export const actions = landingEditorSlice.actions;
export default landingEditorSlice.reducer;
