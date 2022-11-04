import { Document, model, Schema } from "mongoose";
import { ProductModel } from "./product-model";

// 1. Model Interface describing the data in the model:
export interface IOrderItem extends Document {
    quantity: number;
    product: Schema.Types.ObjectId;
}

// 2. Model Schema describing validation, constraints and more:
const OrderItemSchema = new Schema<IOrderItem>({
    quantity: {
        type: Number,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "ProductModel",

    }
}, {
    versionKey: false, // Don't create __v field for versioning
    toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false // Don't duplicate _id into id field
}
)



// 3. Model Class - this is the final model class:
export const OrderItemModel = model<IOrderItem>("OrderItemModel", OrderItemSchema, "orderItems");

