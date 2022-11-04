import { Document, model, Schema } from "mongoose";
import { ProductModel } from "./product-model";

// 1. Interface describing category:
export interface ICategoryModel extends Document {
    name: string;



}

// 2. Schema describing category:
const CategorySchema = new Schema<ICategoryModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "name too long"],
        trim: true,
        unique: true
    }


}, {
    versionKey: false, // Don't create __v field for versioning
    toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false // Don't duplicate _id into id field
});

// add virtual id field whiteout duplicating _id in id field
// CategorySchema.virtual('id').get(function () {
//     return this._id.toHexString();
// }
// );

// 3. Category Model:
export const CategoryModel = model<ICategoryModel>("CategoryModel", CategorySchema, "categories");
