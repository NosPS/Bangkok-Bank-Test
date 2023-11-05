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
  Typography,
} from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { setIsOpenCreate } from "../redux/features/global.slice";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import CreateUserModel from "../redux/models/create-user.model";
import useApi from "../redux/apis/api";

function CreateUserDialog() {
  const reducer = useAppSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const api = useApi();

  const handleClose = () => {
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
    const user: CreateUserModel = {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      website: data.website,
      address: {
        street: data.street,
        suite: data.suite,
        city: data.city,
        zipcode: data.zipcode,
        geo: {
          lat: data.lat,
          lng: data.lng,
        },
      },
      company: {
        name: data.companyName,
        catchPhrase: data.catchPhrase,
        bs: data.bs,
      },
    };

    await api.createUserApi(user, dispatch);
    await api.fetchUsersApi(dispatch);
    handleClose();
  };

  const Header = styled(Typography)({
    fontSize: 16,
    fontWeight: 700,
    marginTop: "2rem",
  });

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
        User Details
      </DialogTitle>

      <DialogContent dividers={true} sx={{ display: "grid", gap: 1 }}>
        <Header sx={{ marginTop: 0 }}>User</Header>

        <FormControl
          error={errors.name?.type === "required"}
          variant="standard"
        >
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            aria-describedby="name-error-text"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <FormHelperText id="name-error-text">
              *name is required.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={errors.username?.type === "required"}
          variant="standard"
        >
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            aria-describedby="username-error-text"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <FormHelperText id="username-error-text">
              *username is required.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={
            errors.email?.type === "required" ||
            errors.email?.type === "pattern"
          }
          variant="standard"
        >
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            aria-describedby="email-error-text"
            {...register("email", {
              required: true,
              pattern: /^[A-Za-z0-9\.]+@([A-Za-z]+\.)+[\w-]{2,4}$/g,
            })}
          />
          {errors.email?.type === "required" && (
            <FormHelperText id="email-error-text">
              *email is required.
            </FormHelperText>
          )}
          {errors.email?.type === "pattern" && (
            <FormHelperText id="email-error-text">
              *must be an email pattern.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={errors.phone?.type === "required"}
          variant="standard"
        >
          <InputLabel htmlFor="phone">Phone</InputLabel>
          <Input
            id="phone"
            aria-describedby="phone-error-text"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <FormHelperText id="phone-error-text">
              *phone is required.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={errors.website?.type === "required"}
          variant="standard"
        >
          <InputLabel htmlFor="website">Website</InputLabel>
          <Input
            id="website"
            aria-describedby="website-error-text"
            {...register("website", { required: true })}
          />
          {errors.website && (
            <FormHelperText id="website-error-text">
              *website is required.
            </FormHelperText>
          )}
        </FormControl>

        <Header>Address</Header>

        <FormControl
          error={errors.street?.type === "required"}
          variant="standard"
        >
          <InputLabel htmlFor="street">Street</InputLabel>
          <Input
            id="street"
            aria-describedby="street-error-text"
            {...register("street", { required: true })}
          />
          {errors.street && (
            <FormHelperText id="street-error-text">
              *street is required.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={errors.suite?.type === "required"}
          variant="standard"
        >
          <InputLabel htmlFor="suite">Suite</InputLabel>
          <Input
            id="suite"
            aria-describedby="suite-error-text"
            {...register("suite", { required: true })}
          />
          {errors.suite && (
            <FormHelperText id="suite-error-text">
              *suite is required.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={errors.city?.type === "required"}
          variant="standard"
        >
          <InputLabel htmlFor="city">City</InputLabel>
          <Input
            id="city"
            aria-describedby="city-error-text"
            {...register("city", { required: true })}
          />
          {errors.city && (
            <FormHelperText id="city-error-text">
              *city is required.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={errors.zipcode?.type === "required"}
          variant="standard"
        >
          <InputLabel htmlFor="zipcode">Zipcode</InputLabel>
          <Input
            id="zipcode"
            aria-describedby="zipcode-error-text"
            {...register("zipcode", { required: true })}
          />
          {errors.zipcode && (
            <FormHelperText id="zipcode-error-text">
              *zipcode is required.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl error={errors.lat?.type === "required"} variant="standard">
          <InputLabel htmlFor="lat">Latitude</InputLabel>
          <Input
            id="lat"
            aria-describedby="lat-error-text"
            {...register("lat", { required: true })}
          />
          {errors.lat && (
            <FormHelperText id="lat-error-text">
              *latitude is required.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl error={errors.lng?.type === "required"} variant="standard">
          <InputLabel htmlFor="lng">Longitude</InputLabel>
          <Input
            id="lng"
            aria-describedby="lng-error-text"
            {...register("lng", { required: true })}
          />
          {errors.lng && (
            <FormHelperText id="lng-error-text">
              *longitude is required.
            </FormHelperText>
          )}
        </FormControl>

        <Header>Company</Header>

        <FormControl
          error={errors.companyName?.type === "required"}
          variant="standard"
        >
          <InputLabel htmlFor="companyName">Name</InputLabel>
          <Input
            id="companyName"
            aria-describedby="companyName-error-text"
            {...register("companyName", { required: true })}
          />
          {errors.companyName && (
            <FormHelperText id="companyName-error-text">
              *company name is required.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          error={errors.catchPhrase?.type === "required"}
          variant="standard"
        >
          <InputLabel htmlFor="catchPhrase">Catch Phrase</InputLabel>
          <Input
            id="catchPhrase"
            aria-describedby="catchPhrase-error-text"
            {...register("catchPhrase", { required: true })}
          />
          {errors.catchPhrase && (
            <FormHelperText id="catchPhrase-error-text">
              *catch phrase is required.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl error={errors.bs?.type === "required"} variant="standard">
          <InputLabel htmlFor="bs">BS</InputLabel>
          <Input
            id="bs"
            aria-describedby="bs-error-text"
            {...register("bs", { required: true })}
          />
          {errors.bs && (
            <FormHelperText id="bs-error-text">*bs is required.</FormHelperText>
          )}
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button type="submit">Create</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateUserDialog;
