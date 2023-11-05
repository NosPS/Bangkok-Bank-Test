import * as React from "react";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import useApi from "../redux/apis/api";
import DataTable from "../components/data-table.component";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import UserDialog from "../components/user-dialog.component";
import { setIsOpenDialog } from "../redux/features/global.slice";
import CreateUserDialog from "../components/create-user-dialog.component";

function UsersPage() {
  const reducer = useAppSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const api = useApi();

  React.useEffect(() => {
    api.fetchUsersApi(dispatch);
  }, []);

  const handleClickSearch = (id: number) => async () => {
    await api.getUserApi(id, dispatch);
    await api.fetchPostsByUserApi(id, dispatch);
    dispatch(setIsOpenDialog(true));
  };

  const handleClickDelete = (id: number) => async () => {
    await api.deleteUserApi(id, dispatch);
    await api.fetchUsersApi(dispatch);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 200 },
    { field: "website", headerName: "Website", width: 200 },
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
    <div id="users-page" className="main-content-page">
      <DataTable data={reducer.data.usersList} colDef={columns}></DataTable>
      <UserDialog />
      <CreateUserDialog />
    </div>
  );
}

export default UsersPage;
