import CreatePostModel from "../models/create-post.model";
import CreateUserModel from "../models/create-user.model";
import { TDispatch } from "../models/dispatch.type";
import CreatePostApi from "./create-post.api";
import CreateUserApi from "./create-user.api";
import DeletePostApi from "./delete-post.api";
import DeleteUserApi from "./delete-user.api";
import FetchPostsByUserApi from "./fetch-posts-by-user.api";
import FetchPostsApi from "./fetch-posts.api";
import FetchUsersApi from "./fetch-users.api";
import GetPostApi from "./get-post.api";
import GetUserByPostApi from "./get-user-by-post.api";
import GetUserApi from "./get-user.api";
import LoginApi from "./login.api";
import RefreshApi from "./refresh.api";

export default function useApi() {
  async function loginApi(dispatch: TDispatch) {
    return await LoginApi(dispatch);
  }

  async function refreshApi(dispatch: TDispatch) {
    return await RefreshApi(dispatch);
  }

  async function createUserApi(data: CreateUserModel, dispatch: TDispatch) {
    return await CreateUserApi(data, dispatch);
  }

  async function fetchUsersApi(dispatch: TDispatch) {
    return await FetchUsersApi(dispatch);
  }

  async function getUserApi(id: number, dispatch: TDispatch) {
    return await GetUserApi(id, dispatch);
  }

  async function deleteUserApi(id: number, dispatch: TDispatch) {
    return await DeleteUserApi(id, dispatch);
  }

  async function fetchPostsByUserApi(id: number, dispatch: TDispatch) {
    return await FetchPostsByUserApi(id, dispatch);
  }

  async function createPostApi(data: CreatePostModel, dispatch: TDispatch) {
    return await CreatePostApi(data, dispatch);
  }

  async function fetchPostsApi(dispatch: TDispatch) {
    return await FetchPostsApi(dispatch);
  }

  async function getPostApi(id: number, dispatch: TDispatch) {
    return await GetPostApi(id, dispatch);
  }

  async function deletePostApi(id: number, dispatch: TDispatch) {
    return await DeletePostApi(id, dispatch);
  }

  async function getUserByPostApi(id: number, dispatch: TDispatch) {
    return await GetUserByPostApi(id, dispatch);
  }

  return {
    loginApi,
    refreshApi,
    createUserApi,
    deleteUserApi,
    fetchUsersApi,
    getUserApi,
    fetchPostsByUserApi,
    createPostApi,
    fetchPostsApi,
    getPostApi,
    deletePostApi,
    getUserByPostApi,
  };
}
