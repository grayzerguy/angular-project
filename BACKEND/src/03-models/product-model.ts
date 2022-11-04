// import { CategoryModel } from './category-model';
import { Document, model, Schema } from "mongoose";

// 1. Model Interface describing the data in the model:
export interface IProductModel extends Document {
    // Don't specify _id here!
    name: string;
    price: number;
    categoryId: Schema.Types.ObjectId;// Foreign Key
    image: string;
    cloudinary_id: string;
}
// 2. Model Schema describing validation, constraints and more:
const ProductSchema = new Schema<IProductModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [3, "Name too short"],
        maxlength: [100, "Name too long"],
        // match: [/^[A-Z].+$/, "Name must start with a capital letter"],
        trim: false,
        unique: true
    },

    image: {
        type: String,
        // required: [true, "Missing price"],
        default: ""
    },


    price: {
        type: Number,
        // required: [true, "Missing price"],
        default: 0
    },


    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "CategoryModel",
    }
    ,
    cloudinary_id: {
        type: String,
        default: ""
    }

}
    , {
    versionKey: false, // Don't create __v field for versioning
    // toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false // Don't duplicate _id into id field
    }
);
// add virtual id field whiteout duplicating _id in id field
// ProductSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// }
// );
// Virtual Fields:
// ProductSchema.virtual("category", {//שם שאנחנו ממצאים שיופיע בחזרה
//     ref: CategoryModel,// Which model are you describing?(הפניה למודל המקושר)
//     localField: "categoryId",// Which field in our (במודל הנוכחי ) model is it
//     foreignField: "_id",// Which field in CategoryModel is it(במודל המקושר)
//     justOne: true
// })
// 3. Model Class - this is the final model class:
export const ProductModel = model<IProductModel>("ProductModel", ProductSchema, "products")