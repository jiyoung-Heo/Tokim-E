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
}

const initialState: LandInfoState = {
  landDetails: [], // 초기 상태는 빈 배열
};

const landinfoSlice = createSlice({
  name: 'landinfo',
  initialState,
  reducers: {
    setLandDetails(state, action: PayloadAction<LandDetail[]>) {
      state.landDetails = action.payload;
    },
  },
});

export const { setLandDetails } = landinfoSlice.actions;
export default landinfoSlice;
