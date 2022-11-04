import ErrorModel from "../03-models/error-model";
import { IUserModel, UserModel } from "../03-models/user-model";
import bcrypt from 'bcryptjs';


async function getAllUsers(): Promise<IUserModel[]> {

    return UserModel.find().select("-passwordHash").exec();

}

//Get one user
async function getOneUser(_id: string): Promise<IUserModel> {
    const user = await UserModel.findById(_id).select("-password").exec();
    if (!user) throw new ErrorModel(404, `_id ${_id} not found`);
    return user;
}


//UPDATE USER
async function updateUser(user: IUserModel): Promise<IUserModel> {
    const userExists = await UserModel.findById(user._id).exec();
    if (!userExists) throw new ErrorModel(404, `_id ${user._id} not found`);
    let password = user.password;
    if (!password) {
        password = user.password;
    }
    else {
        const hash = bcrypt.hashSync(user.password,12);
        user.password = hash;
        delete user.password;
    }

    const errors = user.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, { returnOriginal: false }).exec(); // returnOriginal: false --> return back the db Category and not the Category sent to the function.
    if (!updatedUser) throw new ErrorModel(404, `_id ${user._id} not found`);
    return updatedUser;
}

//DELETE USER
async function deleteUser(_id: string): Promise<IUserModel> {
    const user = await UserModel.findByIdAndDelete(_id).exec();
    if (!user) throw new ErrorModel(404, `_id ${_id} not found`);
    return user;
}

// count all Users
async function countUsers(): Promise<number> {
    return UserModel.countDocuments().exec();

}




export default {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    countUsers
  

}