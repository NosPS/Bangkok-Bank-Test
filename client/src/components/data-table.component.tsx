import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { setIsOpenCreate, setPagination } from "../redux/features/global.slice";
import { Button } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

function DataTable(props: { data: any[]; colDef: GridColDef[] }) {
  const reducer = useAppSelector((state) => state.globalReducer);
  const dispatch = useDispatch();

  const handleClickCreate = () => {
    dispatch(setIsOpenCreate(true));
  };

  function Toolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<CreateIcon />}
          onClick={handleClickCreate}
        >
          Create
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <div
      style={{
        height: "90%",
        maxWidth: "90vw",
        alignSelf: "center",
      }}
    >
      <DataGrid
        sx={{
          height: "80vh",
        }}
        rows={props.data}
        columns={props.colDef}
        paginationModel={reducer.pagination}
        onPaginationModelChange={(model) => {
          dispatch(setPagination(model));
        }}
        pageSizeOptions={[25, 50, 100]}
        slots={{
          toolbar: Toolbar,
        }}
        hideFooterSelectedRowCount
        disableColumnMenu
      />
    </div>
  );
}

export default DataTable;
