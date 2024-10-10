import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Knowledge {
  knowledgeId: number;
  knowledgeName: string;
  knowledgeDescribe: string;
  knowledgeCategory: number;
  knowledgeImageUrl: string;
}

interface LandEssentialKnowledgeState {
  procedures: Knowledge[];
}

const initialState: LandEssentialKnowledgeState = {
  procedures: [], // 리스트로 저장될 배열 초기화
};

export const landEssentialKnowledge = createSlice({
  name: 'landEssentialKnowledge',
  initialState,
  reducers: {
    changeLandEssentialKnowledge(state, action: PayloadAction<Knowledge[]>) {
      state.procedures = action.payload;
    },
  },
});

export const { changeLandEssentialKnowledge } = landEssentialKnowledge.actions;

export default landEssentialKnowledge;
