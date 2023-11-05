import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { setIsOpenCreate } from "../redux/features/global.slice";
import { useForm } from "react-hook-form";
import useApi from "../redux/apis/api";
import TextField from "@mui/material/TextField";
import CreatePostModel from "../redux/models/create-post.model";

function CreatePostDialog() {
  const [postBody, setPostBody] = React.useState("");
  const reducer = useAppSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const api = useApi();

  const handleClose = () => {
    setPostBody("");
    reset();
    dispatch(setIsOpenCreate(false));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const post: CreatePostModel = {
      userId: +data.userId,
      title: data.title,
      body: postBody,
    };

    await api.createPostApi(post, dispatch);
    await api.fetchPostsApi(dispatch);
    handleClose();
  };

  return (
    <Dialog
      open={reducer.isOpenCreate}
      onClose={handleClose}
      scroll={"body"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth={true}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle id="scroll-dialog-title" fontWeight={700}>
        Post
      </DialogTitle>

      <DialogContent dividers={true} sx={{ display: "grid", gap: 1 }}>
        <FormControl
          error={
            errors.userId?.type === "required" ||
            errors.userId?.type === "pattern"
          }
          variant="standard"
        >
          <InputLabel htmlFor="userId">User ID</InputLabel>
          <Input
            id="userId"
            aria-describedby="userId-error-text"
            {...register("userId", { required: true, pattern: /^([0-9]+)$/g })}
          />
          {errors.userId?.type === "required" && (
            <FormHelperText id="userId-error-text">
              *user id is required.
            </FormHelperText>
          )}
          {errors.userId?.type === "pattern" && (
            <FormHelperText id="userId-error-text">
              *must be a number.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={errors.title?.type === "required"}
          variant="standard"
        >
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            id="title"
            aria-describedby="title-error-text"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <FormHelperText id="title-error-text">
              *title is required.
            </FormHelperText>
          )}
        </FormControl>

        <TextField
          id="outlined-multiline-static"
          label="Body"
          multiline
          rows={4}
          defaultValue=""
          onChange={(e) => {
            setPostBody(e.target.value);
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button type="submit">Create</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreatePostDialog;
