
import ErrorModel from "../03-models/error-model";
import { IUserModel, UserModel } from "../03-models/user-model";
import bcrypt from 'bcryptjs';
import cyber from "../01-utils/cyber";



async function register(user: IUserModel): Promise<string> {
    const errors = user.validateSync();
    // check if email is already in use
    const userWithSameEmail = await UserModel.findOne({ email: user.email }).exec();
    if (userWithSameEmail) throw new ErrorModel(400, `Email ${user.email} already in use`);
    if (errors) throw new ErrorModel(400, errors.message);
    // hash password
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    delete user.password;

    //add user to db
    await user.save();


    //create token
    const token = cyber.getNewToken(user);
    return token;
}

//Login to the system
async function login(user: IUserModel): Promise<string> {
    //find user by email
    const userExists = await UserModel.findOne({ email: user.email }).exec();
    //if user not exists
    if (!userExists) throw new ErrorModel(404, `User ${user.email} not found`);
    //check password
    if (user && bcrypt.compareSync(user.password, userExists.password)) {

        // const token = jwt.sign({ _id: userExists._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const token = cyber.getNewToken(userExists);

        return token;

    }
    else {
        throw new ErrorModel(401, "Invalid credentials");
    }

}

export default {
    // addUser,
    register,
    login
}