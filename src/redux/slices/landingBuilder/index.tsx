import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "redux/store";
import { IColor, ILanding, IMember } from "types/landing";
import { initialValues } from "components/CreateSurvey/CreateLanding/ToolBox/Form/utils/initialValues";
import { IBase64 } from "components/Fields/Uploadfile";

export interface LandingBuilder {
  landing: ILanding;
}

interface Update {
  data: {
    [index: string]: string | IColor | IBase64[] | IMember[];
  };
}

const initialState: LandingBuilder = {
  landing: initialValues,
};

export const landingBuilderSlice = createSlice({
  name: "landingBuilder",
  initialState,
  reducers: {
    updateLanding: (state, action: PayloadAction<Update>) => {
      const { data } = action.payload;
      if (data) {
        state.landing = { ...state.landing, ...data };
      }
    },
  },
});

export const { updateLanding } = landingBuilderSlice.actions;

export default landingBuilderSlice.reducer;
