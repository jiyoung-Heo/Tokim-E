import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Knowledge {
  knowledgeId: number;
  knowledgeName: string;
  knowledgeDescribe: string;
  knowledgeCategory: number;
  knowledgeImageUrl: string;
}

interface LandpurchaseProcedureState {
  procedures: Knowledge[];
}

const initialState: LandpurchaseProcedureState = {
  procedures: [], // 리스트로 저장될 배열 초기화
};

export const landpurchaseProcedure = createSlice({
  name: 'landpurchaseProcedure',
  initialState,
  reducers: {
    changeLandpurchaseProcedure(state, action: PayloadAction<Knowledge[]>) {
      state.procedures = action.payload;
    },
  },
});

export const { changeLandpurchaseProcedure } = landpurchaseProcedure.actions;

export default landpurchaseProcedure;
