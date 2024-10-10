import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 법령 정보를 나타내는 인터페이스
interface LawInfo {
  lawContent: string;
  lawDistrict: number;
  lawId: number;
  lawImplementAt: string;
  lawItemNumber: string;
  lawLandUse: string;
  lawName: string;
}

// 여러 개의 법령 정보를 저장하기 위한 상태 인터페이스
interface LawInfoState {
  lawInfos: LawInfo[]; // 법령 정보를 배열로 저장
}

const initialState: LawInfoState = {
  lawInfos: [], // 초기 상태는 빈 배열
};

const lawInfoSlice = createSlice({
  name: 'lawInfo',
  initialState,
  reducers: {
    setLawInfo(state, action: PayloadAction<LawInfo[]>) {
      state.lawInfos = action.payload; // 배열로 업데이트
    },
    resetLawInfo() {
      return initialState; // 초기 상태로 리셋
    },
  },
});

export const { setLawInfo, resetLawInfo } = lawInfoSlice.actions;
export default lawInfoSlice;
