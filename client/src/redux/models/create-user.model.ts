import UserModel from "./user.model";

type CreateUserModel = Omit<UserModel, "id">;

export default CreateUserModel;
