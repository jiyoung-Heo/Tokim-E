import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LandDetail {
  landId: string;
  landDistrictCode: number;
  landDistrict: string;
  landAddress: string;
  landAddressName: string;
  landScale: number;
  landUse: string;
  landUseStatus: string;
  landGradient: string;
  landRoad: string;
  landPrice: number;
  landDanger: number;
}

interface LandInfoState {
  landDetails: LandDetail[];
  landDetail: LandDetail | null;
}

const initialState: LandInfoState = {
  landDetails: [], // 초기 상태는 빈 배열
  landDetail: null, // 단일 개체 초기값은 null
};

const landinfoSlice = createSlice({
  name: 'landinfo',
  initialState,
  reducers: {
    setLandDetails(state, action: PayloadAction<LandDetail[]>) {
      state.landDetails = action.payload;
    },
    setLandDetail(state, action: PayloadAction<LandDetail | null>) {
      state.landDetail = action.payload; // 단일 개체 저장 또는 null로 초기화
    },
    resetLandInfo() {
      return initialState; // 초기 상태로 리셋
    },
  },
});

export const { setLandDetails, setLandDetail, resetLandInfo } =
  landinfoSlice.actions;
export default landinfoSlice;
