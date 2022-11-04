import { OrderItemModel } from './order-item-model';
import { Document, model, Schema } from "mongoose";


// 1. Model Interface describing the data in the model:
export interface IOrder extends Document {
    user: Schema.Types.ObjectId;
    orderItems: [Schema.Types.ObjectId];
    totalPrice: number;
    city: string;
    shippingAddress: string;
    dateOrdered: Date;
    dateShipped: Date;
    lastFourDigits: number;
}

// 2. Model Schema describing validation, constraints and more:
const OrderSchema = new Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
    },

    orderItems: {
        type: [Schema.Types.ObjectId],
        ref: "OrderItemModel",
    },
    totalPrice: { type: Number, default: 0 },
    city: { type: String},
    shippingAddress: { type: String},
    dateOrdered: { type: Date, default: Date.now },
    dateShipped: { type: Date, default: undefined },
    lastFourDigits: { type: Number}
},
    {
        versionKey: false, // Don't create __v field for versioning
        toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
        id: false // Don't duplicate _id into id field
    }
)
//Virtual Fields:  for the orderItems
OrderSchema.virtual("orderItemsArr", {//שם שאנחנו ממצאים שיופיע בחזרה
    ref: OrderItemModel,// Which model are you describing?(הפניה למודל המקושר
    localField: "orderItems",// Which field on the other model are you referencing?(הפניה לשדה המקושר)
    foreignField: "_id",// Which field in our (במודל הנוכחי ) model is it
    justOne: true
}
)

// 3. Model Class - this is the final model class:
export const OrderModel = model<IOrder>("OrderModel", OrderSchema, "orders");


/**
Order Example:

{
    "user": "62ec0543ddd0b94f64e808eb"
    "orderItems" : [
        {
            "quantity": 3,
            "product" : "62ebd9f4a0406985ee274be1"
        },
        {
            "quantity": 2,
            "product" : "62ebff35dd7c63fe87c35c97"
        }
    ],
    "shippingAddress" : "sum sum 2",
    "city": "HIFA",
    "phone": "050996699",
    "lastFourDigits": 1234
    
}

 */

