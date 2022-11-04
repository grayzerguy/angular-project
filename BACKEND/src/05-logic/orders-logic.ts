
import ErrorModel from "../03-models/error-model";
import { OrderItemModel } from "../03-models/order-item-model";
import { IOrder, OrderModel } from "../03-models/order-model";


//GET ALL ORDERS
async function getAllOrders(): Promise<IOrder[]> {

    // Get all products with virtual fields:

    return OrderModel.find().populate("user", 'firstName lastName')
        .sort({ 'dateOrdered': -1 }).exec();
}

//GET ONE ORDER
async function getOneOrder(_id: string): Promise<IOrder> {

    // Get one products with virtual fields:
    const order = await OrderModel.findById(_id)
        .populate("user", 'firstName lastName')
        .populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'categoryId'
            }
        }).exec();
    if (!order) throw new ErrorModel(404, `_id ${_id} not found`);
    return order
}

//ADD ORDER
async function addOrder(order: IOrder): Promise<IOrder> {
    const errors = order.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    return order.save();
}
async function deleteOrder(_id: string): Promise<void> {
    const deletedOrder = await OrderModel.findByIdAndDelete(_id).exec();
    if (!deletedOrder) throw new ErrorModel(404, `_id ${_id} not found`);
    //map through the orderitems and delete them
    deletedOrder.orderItems.map(async (orderItem) => {
        await OrderItemModel.findByIdAndDelete(orderItem).exec();
    }
    )

}

//calculate the sales of all orders
async function getSales(): Promise<number> {
    const totalSales = await OrderModel.aggregate([
        { $group: { _id: null, totalSales: { $sum: 'totalPrice' } } }
    ]).exec();
    if (!totalSales) throw new ErrorModel(404, `not found`);
    return totalSales[0].totalSales;
}







export default {
    getAllOrders,
    addOrder,
    getOneOrder,
    deleteOrder,
    getSales

}
