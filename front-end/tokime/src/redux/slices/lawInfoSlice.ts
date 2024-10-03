import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LawInfoState {
  lawContent: string;
  lawDistrict: number;
  lawId: number;
  lawImplementAt: string;
  lawItemNumber: string;
  lawLandUse: string;
  lawName: string;
}

const initialState: LawInfoState = {
  lawContent: '',
  lawDistrict: 0,
  lawId: 0,
  lawImplementAt: '',
  lawItemNumber: '',
  lawLandUse: '',
  lawName: '',
};

const lawInfoSlice = createSlice({
  name: 'lawInfo',
  initialState,
  reducers: {
    setLawInfo(state, action: PayloadAction<LawInfoState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setLawInfo } = lawInfoSlice.actions;
export default lawInfoSlice;
