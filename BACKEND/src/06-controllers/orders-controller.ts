import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../02-middleware/verify-admin";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import { OrderItemModel } from "../03-models/order-item-model";
import { OrderModel } from "../03-models/order-model";
import { ProductModel } from "../03-models/product-model";
import logic from "../05-logic/orders-logic";

//להוסיף ולידציות
const router = express.Router();

//get all orders
router.get("/",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {

        const OrderList = await logic.getAllOrders();
        response.json(OrderList);
    }
    catch (err: any) {
        next(err);
    }
});
//get one order
router.get("/:id",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        const order = await logic.getOneOrder(id);
        response.json(order);
    }
    catch (err: any) {
        next(err);
    }
}
);

//add order
router.post('/',verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orderItemsIds = Promise.all(request.body.orderItems.map(async (orderItem) => {
            let newOrderItem = new OrderItemModel
                ({
                    quantity: orderItem.quantity,
                    product: orderItem.product
                })

            newOrderItem = await newOrderItem.save();

            return newOrderItem._id;
        }))
        const orderItemsIdsResolved = await orderItemsIds;


        const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
            const orderItem = await OrderItemModel.findById(orderItemId).populate('product', 'price');
            const product = await ProductModel.findById(orderItem.product)
            const totalPrice = orderItem.quantity * product.price;
            return totalPrice
        }))

        const totalPrice = totalPrices.reduce((a, b) => a + b, 0);


        let order = new OrderModel
            ({
                orderItems: orderItemsIdsResolved,
                user: request.body.user,
                totalPrice: totalPrice,
                city: request.body.city,
                shippingAddress: request.body.shippingAddress,
                dateOrdered: request.body.dateOrdered,
                dateShipped: request.body.dateShipped,
                lastFourDigits: request.body.lastFourDigits,

            });
        const addedOrder = await logic.addOrder(order);
        response.status(201).json(addedOrder);
    }
    catch (err: any) {
        next(err);
    }
}
);
//update order
router.put('/:id',verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const order = await OrderModel.findByIdAndUpdate(
            request.params.id,
            {
                dateShipped: request.body.dateShipped,
            },
            { new: true }
        );
        response.json(order);

    }
    catch (err: any) {
        next(err);
    }

}
);
//delete order
router.delete("/:_id",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await logic.deleteOrder(_id);
        response.json({ success: true, massage: "the order deleted" }).sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

//get total price of all orders 
router.get('/get/totalSales', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const totalSales = await OrderModel.aggregate([
            { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } }
        ])

        response.send({ totalSales: totalSales.pop().totalSales })
    }
    catch (err: any) {
        next(err);
    }
}
)

//get count of orders
router.get(`/get/count`, verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orderCount = await OrderModel.countDocuments();
        response.send({ orderCount: orderCount })
    }
    catch (err: any) {
        next(err);
    }
}
)
//get all orders by user
router.get(`/get/userorders/:userid`, verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userOrderList = await OrderModel.find({ user: request.params.userid }).populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'categoryId'
            }
        }).sort({ 'dateOrdered': -1 });

        response.send(userOrderList);
    }
    catch (err: any) {
        next(err);
    }

})


export default router;