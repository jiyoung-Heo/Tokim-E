import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LandAddressState {
  district: string;
  address: string;
}

const initialState: LandAddressState = {
  district: '',
  address: '',
};

const landAddressSlice = createSlice({
  name: 'landaddress',
  initialState,
  reducers: {
    setLandAddress(state, action: PayloadAction<LandAddressState>) {
      state.district = action.payload.district;
      state.address = action.payload.address;
    },
  },
});

export const { setLandAddress } = landAddressSlice.actions;
export default landAddressSlice;
