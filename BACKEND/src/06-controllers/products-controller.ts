
import { ProductModel } from '../03-models/product-model';
import express, { NextFunction, Request, Response } from "express";
import logic from "../05-logic/products-logic";
import verifyAdmin from '../02-middleware/verify-admin';
import uploadOptions from '../01-utils/multer';
import { v2 as cloudinary } from "cloudinary";
import verifyLoggedIn from '../02-middleware/verify-logged-in';

//להוסיף ולידציות


const router = express.Router();

//get all products
router.get("/", async (request: Request, response: Response, next: NextFunction) => {

    let filter = {}

    if (request.query.categories) {

        try {
            filter = request.query.categories.toString().split(",");
            const productsList = await logic.getAllProductsByCategory(filter);
            response.json(productsList);
        }
        catch (err: any) {
            next(err);
        }
    }
    else {
        try {
            const products = await logic.getAllProducts();
            response.json(products);
        }
        catch (err: any) {
            next(err);
        }
    }
});
//getProductsByCategory 
router.get("/category/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categoryId = request.params._id;
        const products = await logic.getProductsByCategory(categoryId);
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

//get one product
router.get("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;

        const product = await logic.getOneProduct(_id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/", uploadOptions.single('image'), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const file = request.file;
        if (!file) {
            // throw new Error('No file received');//in case we don't allow to upload white image
            const product = new ProductModel(request.body);//in case we allow to upload whiteout image
            const addedCategory = await logic.addProduct(product);
            response.status(201).json(addedCategory);
        }
        const fileName = request.file.filename;
        const imageUrl = request.file.path;
        const product = new ProductModel({
            name: request.body.name,
            price: request.body.price,
            image: `${imageUrl}`,
            categoryId: request.body.categoryId,
            cloudinary_id: `${fileName}`,

        });
        const addedProduct = await logic.addProduct(product);
        response.status(201).json(addedProduct);

    }
    catch (err: any) {
        next(err);
    }
}
);

//updatedProduct
router.put("/:_id", uploadOptions.single('image'), async (request: Request, response: Response, next: NextFunction) => {
    //updatedProduct with image
    try {
        const file = request.file;
        // if (file) {

        const _id = request.params._id;
        const productToDeleteFromCloud = await logic.getOneProduct(_id);
        cloudinary.uploader.destroy(productToDeleteFromCloud.cloudinary_id);
        const fileName = request.file.filename;
        const imageUrl = request.file.path;
        const product = new ProductModel({
            _id: request.params._id,
            name: request.body.name,
            price: request.body.price,
            image: `${imageUrl}`,
            categoryId: request.body.categoryId,
            cloudinary_id: `${fileName}`,

        });
        const updatedProduct = await logic.updateProduct(product);
        response.json(updatedProduct);

    }
    // else {
    //     const _id = request.params._id;
    //     const productToUpdate = await logic.getOneProduct(_id);
    //     const product = new ProductModel({
    //         _id: request.params._id,
    //         name: request.body.name,
    //         price: request.body.price,
    //         image: productToUpdate.image,
    //         categoryId: request.body.categoryId,
    //         cloudinary_id: productToUpdate.cloudinary_id,

    //     });
    //     const updatedProduct = await logic.updateProduct(product);
    //     response.json(updatedProduct);
    // }
    // }

    catch (err: any) {
        next(err);
    }
}
);



router.delete("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        //get the product
        const productToDeleteFromCloud = await logic.getOneProduct(_id);
        //delete the image from cloudinary
        if (productToDeleteFromCloud.cloudinary_id) {
            cloudinary.uploader.destroy(productToDeleteFromCloud.cloudinary_id
            );
        }
        //delete the product
        await logic.deleteProduct(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
}
);





//count all products in / ספירה של כל המוצרים בדוקומנט
router.get("/get/count", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await logic.countProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});
// get all products that are featured מועדפים
// router.get("/get/featured/:count", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         let count = request.params.count
//         const products = await logic.getFeaturedProducts(count);
//         response.json(products);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });
//update image
// router.put("/image/:_id", uploadOptions.single('image'), async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const _id = request.params._id;
//         const productToDeleteFromCloud = await logic.getOneProduct(_id);
//         cloudinary.uploader.destroy(productToDeleteFromCloud.cloudinary_id);
//         const fileName = request.file.filename;
//         const imageUrl = request.file.path;
//         const product = new ProductModel({
//             _id: request.params._id,
//             name: request.body.name=productToDeleteFromCloud.name,
//             price: request.body.price=productToDeleteFromCloud.price,
//             image: `${imageUrl}`,
//             categoryId: request.body.categoryId,
//             cloudinary_id: `${fileName}`,
//         });
//         const updatedProduct = await logic.updateProduct(product);
//         response.json(updatedProduct);
//     }
//     catch (err: any) {
//         next(err);
//     }
// }
// );





export default router;