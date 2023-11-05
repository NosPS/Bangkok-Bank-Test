import * as React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import useApi from "../redux/apis/api";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DataTable from "../components/data-table.component";
import PostDialog from "../components/post-dialog.component";
import { setIsOpenDialog } from "../redux/features/global.slice";
import CreatePostDialog from "../components/create-post-dialog.component";

function PostsPage() {
  const reducer = useAppSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const api = useApi();

  React.useEffect(() => {
    api.fetchPostsApi(dispatch);
  }, []);

  const handleClickSearch = (id: number) => async () => {
    await api.getPostApi(id, dispatch);
    await api.getUserByPostApi(id, dispatch);
    dispatch(setIsOpenDialog(true));
  };

  const handleClickDelete = (id: number) => async () => {
    await api.deletePostApi(id, dispatch);
    await api.fetchPostsApi(dispatch);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 400 },
    { field: "body", headerName: "Body", width: 600 },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<SearchOutlinedIcon />}
            label="Search"
            onClick={handleClickSearch(+id)}
          />,
          <GridActionsCellItem
            icon={<DeleteOutlineOutlinedIcon />}
            label="Delete"
            onClick={handleClickDelete(+id)}
          />,
        ];
      },
    },
  ];

  return (
    <div id="posts-page" className="main-content-page">
      <DataTable data={reducer.data.postsList} colDef={columns}></DataTable>
      <PostDialog />
      <CreatePostDialog />
    </div>
  );
}

export default PostsPage;
