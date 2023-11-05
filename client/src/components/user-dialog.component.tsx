import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { setIsOpenDialog } from "../redux/features/global.slice";

function UserDialog() {
  const reducer = useAppSelector((state) => state.globalReducer);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsOpenDialog(false));
  };

  const CardKey = styled(Typography)({
    display: "inline-flex",
    fontSize: 16,
    fontWeight: 700,
    color: "rgba(0, 0, 0, 0.6)",
  });

  const CardNestedHead = styled(Typography)({
    fontSize: 16,
    fontWeight: 700,
    color: "rgba(0, 0, 0, 0.6)",
  });

  const CardNestedKey = styled(Typography)({
    display: "inline-flex",
    fontSize: 16,
    fontWeight: 700,
    marginLeft: "2rem",
    color: "rgba(0, 0, 0, 0.6)",
  });

  const CardValue = styled(Typography)({
    fontSize: 16,
    fontWeight: 500,
    marginLeft: "1rem",
    color: "rgba(0, 0, 0, 0.6)",
  });

  return (
    <Dialog
      open={reducer.isOpenDialog}
      onClose={handleClose}
      scroll={"body"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth={true}
    >
      <DialogTitle id="scroll-dialog-title" fontWeight={700}>
        User Details
      </DialogTitle>

      <DialogContent dividers={false}>
        <Card>
          <CardContent>
            <CardKey as={"div"}>
              ID:
              <CardValue>{reducer.data.user.id}</CardValue>
            </CardKey>
            <br />
            <CardKey as={"div"}>
              Name:
              <CardValue>{reducer.data.user.name}</CardValue>
            </CardKey>
            <br />
            <CardKey as={"div"}>
              Username:
              <CardValue>{reducer.data.user.username}</CardValue>
            </CardKey>
            <br />
            <CardKey as={"div"}>
              Email:
              <CardValue>{reducer.data.user.email}</CardValue>
            </CardKey>
            <br />
            <CardNestedHead as={"div"}>
              Address:
              <br />
              <CardNestedKey as={"div"}>
                Street:
                <CardValue>{reducer.data.user.address.street}</CardValue>
              </CardNestedKey>
              <br />
              <CardNestedKey as={"div"}>
                Suite:
                <CardValue>{reducer.data.user.address.suite}</CardValue>
              </CardNestedKey>
              <br />
              <CardNestedKey as={"div"}>
                City:
                <CardValue>{reducer.data.user.address.city}</CardValue>
              </CardNestedKey>
              <br />
              <CardNestedKey as={"div"}>
                Zipcode:
                <CardValue>{reducer.data.user.address.zipcode}</CardValue>
              </CardNestedKey>
              <br />
              <CardNestedHead sx={{ marginLeft: "2rem" }} as={"div"}>
                Geo:
                <br />
                <CardNestedKey as={"div"}>
                  Lat:
                  <CardValue>{reducer.data.user.address.geo.lat}</CardValue>
                </CardNestedKey>
                <br />
                <CardNestedKey as={"div"}>
                  Lng:
                  <CardValue>{reducer.data.user.address.geo.lng}</CardValue>
                </CardNestedKey>
              </CardNestedHead>
            </CardNestedHead>
            <CardKey as={"div"}>
              Phone:
              <CardValue>{reducer.data.user.phone}</CardValue>
            </CardKey>
            <br />
            <CardKey as={"div"}>
              Website:
              <CardValue>{reducer.data.user.website}</CardValue>
            </CardKey>
            <br />
            <CardNestedHead as={"div"}>
              Company:
              <br />
              <CardNestedKey as={"div"}>
                Name:
                <CardValue>{reducer.data.user.company.name}</CardValue>
              </CardNestedKey>
              <br />
              <CardNestedKey as={"div"}>
                Catch Phrase:
                <CardValue>{reducer.data.user.company.catchPhrase}</CardValue>
              </CardNestedKey>
              <br />
              <CardNestedKey as={"div"}>
                BS:
                <CardValue>{reducer.data.user.company.bs}</CardValue>
              </CardNestedKey>
            </CardNestedHead>
          </CardContent>
        </Card>
      </DialogContent>

      <DialogTitle id="scroll-dialog-title" fontWeight={700}>
        Posts
      </DialogTitle>

      <DialogContent
        style={{
          display: "grid",
          gap: 4,
        }}
      >
        {reducer.data.postsList.map((post, index) => {
          return (
            <Card key={index}>
              <CardContent>
                <CardKey as={"div"}>
                  ID:
                  <CardValue>{post.id}</CardValue>
                </CardKey>
                <br />
                <CardKey as={"div"}>
                  User ID:
                  <CardValue>{post.userId}</CardValue>
                </CardKey>
                <br />
                <CardKey as={"div"}>
                  Title:
                  <CardValue>{post.title}</CardValue>
                </CardKey>
                <br />
                <CardKey as={"div"}>
                  Body:
                  <CardValue>{post.body}</CardValue>
                </CardKey>
              </CardContent>
            </Card>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDialog;
