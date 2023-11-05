import { createSlice } from "@reduxjs/toolkit";
import UserModel from "../models/user.model";
import PostModel from "../models/post.model";
import ErrorModel from "../models/error.model";
import SuccessModel from "../models/success.model";
import { PaginationModel } from "../models/pagination.model";

export interface GlobalState {
  isLoading: boolean;
  isOpenDialog: boolean;
  isOpenCreate: boolean;
  isOpenDrawer: boolean;
  data: {
    user: UserModel;
    usersList: UserModel[];
    post: PostModel;
    postsList: PostModel[];
  };
  success: SuccessModel;
  error: ErrorModel;
  pagination: PaginationModel;
  rowCount: number;
}

const initialState: GlobalState = {
  isLoading: false,
  isOpenDialog: false,
  isOpenCreate: false,
  isOpenDrawer: false,
  data: {
    user: {
      id: 0,
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    },
    usersList: [],
    post: {
      id: 0,
      userId: 0,
      title: "",
      body: "",
    },
    postsList: [],
  },
  success: {
    status: false,
    message: "",
  },
  error: {
    status: false,
    message: "",
  },
  pagination: {
    pageSize: 25,
    page: 0,
  },
  rowCount: 1,
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
    setIsOpenDialog(state, action) {
      state.isOpenDialog = action.payload;
    },
    setIsOpenCreate(state, action) {
      state.isOpenCreate = action.payload;
    },
    setIsOpenDrawer(state, action) {
      state.isOpenDrawer = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
      state.isLoading = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
    setRowCount(state, action) {
      state.rowCount = action.payload;
    },
    setUser(state, action) {
      state.data.user = action.payload;
    },
    setUsersList(state, action) {
      state.data.usersList = action.payload;
    },
    setPost(state, action) {
      state.data.post = action.payload;
    },
    setPostsList(state, action) {
      state.data.postsList = action.payload;
    },
  },
});

export const {
  setPending,
  setComplete,
  setIsOpenDialog,
  setIsOpenCreate,
  setIsOpenDrawer,
  setSuccess,
  setError,
  setPagination,
  setRowCount,
  setUser,
  setUsersList,
  setPost,
  setPostsList,
} = slice.actions;

const globalReducer = slice.reducer;

export default globalReducer;
