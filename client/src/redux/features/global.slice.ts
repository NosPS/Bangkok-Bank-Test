import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
  isLoading: boolean;
  isOpenModal: boolean;
  data: {
    accessToken: string;
  };
  error: {
    status: boolean;
    message: string;
    to: string;
  };
  page: number;
  pageSize: number;
  pageCount: number;
}

const initialState: GlobalState = {
  isLoading: false,
  isOpenModal: false,
  data: {
    accessToken: "",
  },
  error: {
    status: false,
    message: "",
    to: "",
  },
  page: 1,
  pageSize: 10,
  pageCount: 1,
};

export const slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setPending(state) {
      state.isLoading = true;
    },
    setComplete(state) {
      state.isLoading = false;
    },
    setIsOpenModal(state, action) {
      state.isOpenModal = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setAccessToken(state, action) {
      state.data.accessToken = action.payload;
    },
  },
});

export const {
  setPending,
  setComplete,
  setIsOpenModal,
  setError,
  setPage,
  setPageSize,
  setPageCount,
  setAccessToken,
} = slice.actions;

const globalReducer = slice.reducer;

export default globalReducer;
