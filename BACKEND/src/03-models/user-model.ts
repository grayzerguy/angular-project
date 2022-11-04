import { Document, model, Schema } from "mongoose";

// 1. Model Interface describing the data in the model:
export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    street: string;
    phone: string;
    isAdmin: boolean;
}
// 2. Model Schema describing validation, constraints and more:
const UserSchema = new Schema<IUserModel>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            },
    password: {
        type: String,
    },
    city: {
        type: String,
        required: [true, "missing city"],
        default :""
    },
    street: {
        type: String,
        required: [true, "missing street"],
        default :""
    },
    phone: {
        type: String,
        required: [true, "missing phone"],
        match: /^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$/,
    }
    ,
    isAdmin: {
        type: Boolean,
        default: false,
    }

}
    , {
    versionKey: false, // Don't create __v field for versioning
    toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false // Don't duplicate _id into id field
})
UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
}
);



// 3. Model Class - this is the final model class:
export const UserModel = model<IUserModel>("UserModel", UserSchema, "users")


